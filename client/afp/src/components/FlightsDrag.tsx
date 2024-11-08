/**
 * Компонент рабочая область полетов
 *
 * @author Markitanov Vadim
 * @since 22.11.2023
 */
import React, { JSX, LegacyRef, useEffect, useRef, useState } from 'react'
import {
	BOARD_ITEM_HEIGHT,
	BOARD_ITEM_WIDTH,
	DATE_ITEM_HEIGHT,
	DATE_ITEM_WIDTH,
	FLIGHT_ITEM_HEIGHT,
	HEADER_HEIGHT,
	MINUTES_IN_CELL,
	RESIZE_STICK_WIDTH,
	SHOW_FLIGHT_ID,
	SHOW_OLD_STICKS
} from '../utils/consts'
import dayjs from 'dayjs'
import * as d3 from 'd3'
import { FlightViewModelDrag } from '../models/FlightViewModelDrag'
import { FlightType } from '../models/FlightType'
import { useStore } from 'effector-react'
import { appendRotateText, dateToX, drawRect, drawText, xToDate } from '../utils/utils'
import { DragModel } from '../models/DragModel'
import { DragType } from '../models/DragType'
import { Flight } from '../models/Flight'
import { Board } from '../models/Board'
import { $boards } from '../store/board'
import { $dates } from '../store/date'

const FlightsDrag = (): JSX.Element => {
	const dates = useStore($dates)
	const boards: Board[] = useStore($boards)
	const svgRef: LegacyRef<any> = useRef<SVGSVGElement | undefined>()

	const [dragModel, setDragModel] = useState<DragModel | undefined>(undefined)
	const dragModelRef = useRef(dragModel)

	const [flightViewModels, setFlightViewModels] = useState<FlightViewModelDrag[]>()
	const [curDragFlight, setCurDragFlight] = useState<FlightViewModelDrag | undefined>()
	const curDragFlightRef = useRef(curDragFlight)

	const [shifts, setShifts] = useState({ x: 0, y: 0 })
	const shiftsRef = useRef(shifts)

	const height = BOARD_ITEM_HEIGHT * boards.length + HEADER_HEIGHT + DATE_ITEM_HEIGHT
	const width = BOARD_ITEM_WIDTH + DATE_ITEM_WIDTH * dates.length

	useEffect(() => {
		shiftsRef.current = shifts
	}, [shifts])

	useEffect(() => {
		dragModelRef.current = dragModel
	}, [dragModel])

	useEffect(() => {
		curDragFlightRef.current = curDragFlight
	}, [curDragFlight])

	useEffect(() => {
		const svg = d3.select(svgRef.current)
		svg.call(d3.drag()
			.on('drag', event => {
				let newPosX = event.x + shiftsRef.current.x
				let newPosY = event.y + shiftsRef.current.y

				const dragType = dragModelRef.current?.type
				const cur = curDragFlightRef.current
				switch (dragType) {
					case DragType.LEFT:
						if (newPosX <= BOARD_ITEM_WIDTH) {
							newPosX = BOARD_ITEM_WIDTH
						}

						if (cur) {
							const newStartDate = xToDate(newPosX)
							const oldEndDate = cur.model.endDate

							if (newStartDate.isBefore(oldEndDate)) {
								cur.model.startDate = newStartDate
							} else {
								cur.model.startDate = oldEndDate
								cur.model.endDate = newStartDate
							}

							updateCurDragFlight(cur.model, newPosX, cur.y, 140, cur.index, cur.oldX1, cur.oldX2)
						}
						break

					case DragType.CENTER:
						if (newPosX <= BOARD_ITEM_WIDTH) {
							newPosX = BOARD_ITEM_WIDTH
						}

						if (dragModelRef.current && dragModelRef.current.flight) {
							if (newPosX >= width - dragModelRef.current.flight.width) {
								newPosX = width - dragModelRef.current.flight.width
							}
						}

						if (newPosY <= HEADER_HEIGHT + DATE_ITEM_HEIGHT) {
							newPosY = HEADER_HEIGHT + DATE_ITEM_HEIGHT
						}

						if (newPosY >= height - FLIGHT_ITEM_HEIGHT) {
							newPosY = height - FLIGHT_ITEM_HEIGHT
						}

						if (cur) {
							const newStartX = cur.x - BOARD_ITEM_WIDTH
							const newStartMinutes = newStartX * MINUTES_IN_CELL / DATE_ITEM_WIDTH
							const model = cur.model
							const diffMinutes = dayjs(model.endDate).diff(model.startDate, 'minutes')
							model.startDate = dayjs().startOf('day').add(newStartMinutes, 'minutes')
							model.endDate = dayjs().startOf('day').add(newStartMinutes + diffMinutes, 'minutes')
							updateCurDragFlight(cur.model, newPosX, newPosY, cur.width, cur.index, cur.oldX1, cur.oldX2)
						}

						break

					case DragType.RIGHT:
						if (dragModelRef.current && dragModelRef.current.flight && cur) {
							const endDate = dragModelRef.current?.flight.model.endDate

							if (dateToX(endDate) > BOARD_ITEM_WIDTH + DATE_ITEM_WIDTH * dates.length) {
								newPosX = BOARD_ITEM_WIDTH + DATE_ITEM_WIDTH * dates.length + shiftsRef.current.x
							}

							const oldStartDate = cur.model.startDate
							const newEndDate = xToDate(newPosX - shiftsRef.current.x)

							if (oldStartDate.isAfter(newEndDate)) {
								cur.model.startDate = newEndDate
								cur.model.endDate = oldStartDate
							} else {
								cur.model.endDate = newEndDate
							}

							updateCurDragFlight(cur.model, cur.oldX1, cur.y, 140, cur.index, cur.oldX1, cur.oldX2)
						}

						break
				}
			})
			.on('start', event => {
				flightViewModels?.forEach(value => {
					if (
						event.x >= value.x && event.x <= value.x + value.width &&
						event.y >= value.y && event.y <= value.y + FLIGHT_ITEM_HEIGHT
					) {
						setDragModel({ flight: value, type: dragModelRef.current?.type as DragType })
						updateCurDragFlight(value.model, value.x, value.y, value.width, value.index, value.oldX1, value.oldX2)
						setShifts({ x: value.x - event.x, y: value.y - event.y })
					}
				})
			})
			.on('end', _ => {
				if (curDragFlightRef.current) {
					const newStartX = curDragFlightRef.current.x - BOARD_ITEM_WIDTH
					const newStartMinutes = newStartX * MINUTES_IN_CELL / DATE_ITEM_WIDTH
					const model = curDragFlightRef.current?.model
					const diffMinutes = dayjs(model.endDate).diff(model.startDate, 'minutes')
					model.startDate = dayjs().startOf('day').add(newStartMinutes, 'minutes')
					const newEndDate = dayjs().startOf('day').add(newStartMinutes + diffMinutes, 'minutes')
					if (dateToX(newEndDate) >= BOARD_ITEM_WIDTH + DATE_ITEM_WIDTH * dates.length) {
						model.endDate = xToDate(BOARD_ITEM_WIDTH + DATE_ITEM_WIDTH * dates.length)
					} else {
						model.endDate = newEndDate
					}
				}

				setDragModel(undefined)
				setCurDragFlight(undefined)
			})
		)
	}, [flightViewModels, shiftsRef, height, width, boards, curDragFlight])

	useEffect(() => {
		const temp: FlightViewModelDrag[] = []
		boards.forEach((value, index) => {
			if (!value.flights) {
				return undefined
			}
			value.flights.forEach((flightModel) => {
				const flightViewModel: FlightViewModelDrag = {
					model: flightModel,
					index: index,
					x: 0,
					y: 0,
					width: 0,
					oldX1: 0,
					oldX2: 0
				}

				temp.push(flightViewModel)
			})
		})
		setFlightViewModels(temp)

	}, [boards])

	useEffect(() => {
		const svg = d3.select(svgRef.current)
		svg.selectAll('*').remove()
		flightViewModels?.forEach(flightModel => {
			const flightDurationMinutes = flightModel.model.endDate.diff(flightModel.model.startDate, 'minutes')
			const flightWidth = DATE_ITEM_WIDTH / MINUTES_IN_CELL * flightDurationMinutes
			const oldX1: number = dateToX(flightModel.model.startDate)
			const oldX2: number = dateToX(flightModel.model.endDate)
			let flightX1: number = 0
			let flightY: number = 0
			const isDragging = flightModel.model.id === dragModelRef.current?.flight.model.id
			const cursor: string = isDragging ? 'grabbing' : 'grab'
			const isDefault = flightModel.model.type === FlightType.DEFAULT

			if (isDragging) {
				if (curDragFlightRef.current) {
					flightX1 = curDragFlightRef.current.x
					flightY = curDragFlightRef.current.y
				}
			} else {
				flightX1 = dateToX(flightModel.model.startDate)
				flightY = HEADER_HEIGHT + DATE_ITEM_HEIGHT + BOARD_ITEM_HEIGHT * flightModel.index + (BOARD_ITEM_HEIGHT - FLIGHT_ITEM_HEIGHT) * 0.5
			}

			flightModel.x = flightX1
			flightModel.y = flightY
			flightModel.width = flightWidth
			flightModel.oldX1 = oldX1
			flightModel.oldX2 = oldX2

			svg.append('rect')
				.attr('x', flightX1)
				.attr('y', flightY)
				.attr('width', flightWidth)
				.attr('height', FLIGHT_ITEM_HEIGHT)
				.attr('stroke', isDefault ? 'green' : 'orange')
				.attr('fill', isDragging ? 'red' : isDefault ? 'lightgreen' : 'orange')
				.attr('cursor', cursor)
				.on('mousedown', function (event: any) {
					const shiftX = flightModel.x - event.x
					const shiftY = flightModel.y - event.y
					setShifts({ x: shiftX, y: shiftY })
					setDragModel({ flight: flightModel, type: DragType.CENTER })
				})

			if (SHOW_FLIGHT_ID) {
				svg.append('text')
					.attr('x', flightX1 + 5)
					.attr('y', flightY)
					.attr('fill', 'white')
					.attr('text-anchor', 'start')
					.attr('dominant-baseline', 'hanging')
					.attr('cursor', cursor)
					.text(flightModel.model.id)
			}

			if (!isDefault) {
				drawText(svg, 'Тех. обслуживание', flightX1 + flightWidth * 0.5, flightY + FLIGHT_ITEM_HEIGHT * 0.5 + 1, cursor)
			}

			const leftStick: any = drawRect(svg, flightX1, flightY, RESIZE_STICK_WIDTH, FLIGHT_ITEM_HEIGHT, 'blue', 'blue', 'ew-resize')
			leftStick.on('mousedown', function () {
				setDragModel({ flight: flightModel, type: DragType.LEFT })
			})
			const rightStick: any = drawRect(svg, flightX1 + flightWidth - RESIZE_STICK_WIDTH, flightY, RESIZE_STICK_WIDTH, FLIGHT_ITEM_HEIGHT, 'blue', 'blue', 'ew-resize')
			rightStick.on('mousedown', function () {
				setDragModel({ flight: flightModel, type: DragType.RIGHT })
			})

			if (SHOW_OLD_STICKS) {
				drawRect(svg, oldX1, flightY, RESIZE_STICK_WIDTH * 0.4, FLIGHT_ITEM_HEIGHT, 'brown', 'brown', 'auto')
				drawRect(svg, oldX2, flightY, RESIZE_STICK_WIDTH * 0.4, FLIGHT_ITEM_HEIGHT, 'brown', 'brown', 'auto')
			}

			// appendRotateText(svg, flightX1, flightY, flightModel.model.startDate.format('HH:mm'), -16)
			// appendRotateText(svg, flightX1 + flightWidth, flightY, flightModel.model.endDate.format('HH:mm'), -16)
		})

	}, [flightViewModels, curDragFlight])

	const updateCurDragFlight = (model: Flight, x: number, y: number, width: number, index: number, oldX1: number, oldX2: number): void => {
		setCurDragFlight({ model: model, x: x, y: y, width: width, index: index, oldX1: oldX1, oldX2: oldX2 })
	}

	return (
		<svg ref={svgRef}>
			{/*<g>
                {boards.map((value, index) => {
                    if (!value.flights) {
                        return undefined
                    }
                    const flightsItems: JSX.Element[] = []
                    const startDay = dayjs().startOf('day')
                    value.flights.forEach(flight => {
                        const diffHours = flight.startDate.diff(startDay, 'hours')
                        const flightDuration = flight.endDate.diff(flight.startDate, 'hours')
                        const startX = FLIGHT_ITEM_WIDTH + DATE_ITEM_WIDTH / HOURS_IN_CELL * diffHours
                        const flightWidth = DATE_ITEM_WIDTH / HOURS_IN_CELL * flightDuration
                        flightsItems.push(<FlightItem key={flight.id}
                                                  x={startX}
                                                  y={DATE_ITEM_HEIGHT + FLIGHT_ITEM_HEIGHT * index}
                                                  width={flightWidth}
                                                  data={flight}
                        />)
                    })

                    return (
                        <g key={`flights_items_${value.id}`}>{flightsItems}</g>
                    )
                })}
            </g>*/}
		</svg>
	)
}

export default FlightsDrag