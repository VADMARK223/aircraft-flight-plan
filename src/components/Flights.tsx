/**
 * Компонент
 *
 * @author Markitanov Vadim
 * @since 04.12.2023
 */
import React, { JSX, LegacyRef, useEffect, useRef, useState } from 'react'
import { Board } from '../models/Board'
import { useStore } from 'effector-react'
import { FlightViewModel } from '../models/FlightViewModel'
import {
	BOARD_ITEM_HEIGHT,
	BOARD_ITEM_WIDTH,
	DATE_ITEM_HEIGHT,
	DATE_ITEM_WIDTH,
	FLIGHT_ITEM_HEIGHT,
	HEADER_HEIGHT,
	MINUTES_IN_CELL,
	SHOW_FLIGHT_ID
} from '../utils/consts'
import * as d3 from 'd3'
import { appendRotateText, dateToNew, dateToX, drawText, xToDate } from '../utils/utils'
import { FlightType } from '../models/FlightType'
import { $flightsSelect, flightClickFx } from '../store/flight'
import { $boards } from '../store/board'
import { $datesRange } from '../store/date'
import { Dayjs } from 'dayjs'

const Flights = (): JSX.Element => {
	const datesRange = useStore($datesRange)
	const boards: Board[] = useStore($boards)
	const flightsSelect = useStore($flightsSelect)
	const svgRef: LegacyRef<any> = useRef<SVGSVGElement | undefined>()

	const [flightViewModels, setFlightViewModels] = useState<FlightViewModel[]>()

	useEffect(() => {
		if (datesRange === null) {
			return
		}

		const startRange = datesRange[0]
		if (startRange === null) {
			return
		}

		const endRange = datesRange[1]
		if (endRange === null) {
			return
		}

		const temp: FlightViewModel[] = []
		boards.forEach((value, index) => {
			if (!value.flights) {
				return undefined
			}
			value.flights.forEach((flightModel) => {
				const flightViewModel: FlightViewModel = {
					model: flightModel,
					index: index,
					x: 0,
					y: 0,
					width: 0,
					oldX1: 0,
					oldX2: 0
				}

				const startDate = flightViewModel.model.startDate
				const endDate = flightViewModel.model.endDate
				const newEndRange = endRange.add(1, 'days')

				if (
					endDate.isAfter(startRange)
					&& startDate.isBefore(newEndRange)
				) {
					temp.push(flightViewModel)
				}
			})
		})
		setFlightViewModels(temp)

	}, [boards, datesRange])

	useEffect(() => {
		const svg = d3.select(svgRef.current)
		svg.selectAll('*').remove()
		flightViewModels?.forEach(flightModel => {
			const oldX1: number = dateToX(flightModel.model.startDate)
			const oldX2: number = dateToX(flightModel.model.endDate)
			const isSelect = flightModel.model.id === flightsSelect?.id
			const cursor: string = 'pointer'
			const isDefault = flightModel.model.type === FlightType.DEFAULT

			let flightX1 = dateToNew(datesRange, flightModel.model.startDate)
			if (flightX1 <= BOARD_ITEM_WIDTH) {
				flightX1 = BOARD_ITEM_WIDTH
			}

			let endX = dateToNew(datesRange, flightModel.model.endDate)

			const flightDurationMinutes = xToDate(endX).diff(xToDate(flightX1), 'minutes')
			const flightWidth = DATE_ITEM_WIDTH / MINUTES_IN_CELL * flightDurationMinutes
			const flightY = HEADER_HEIGHT + DATE_ITEM_HEIGHT + BOARD_ITEM_HEIGHT * flightModel.index + (BOARD_ITEM_HEIGHT - FLIGHT_ITEM_HEIGHT) * 0.5

			flightModel.x = flightX1
			flightModel.y = flightY
			flightModel.width = flightWidth
			flightModel.oldX1 = oldX1
			flightModel.oldX2 = oldX2

			const container = svg.append('g')
				.on('click', function (_: PointerEvent) {
					flightClickFx(flightModel.model)
				})

			container.append('rect')
				.attr('x', flightX1)
				.attr('y', flightY)
				.attr('width', flightWidth)
				.attr('height', FLIGHT_ITEM_HEIGHT)
				.attr('stroke', isSelect ? 'red' : isDefault ? 'green' : 'orange')
				.attr('stroke-width', isSelect ? '3' : '1')
				.attr('fill', isDefault ? 'lightgreen' : 'orange')
				.attr('cursor', cursor)

			if (SHOW_FLIGHT_ID) {
				container.append('text')
					.attr('x', flightX1 + 5)
					.attr('y', flightY)
					.attr('fill', 'white')
					.attr('text-anchor', 'start')
					.attr('dominant-baseline', 'hanging')
					.attr('cursor', cursor)
					.text(flightModel.model.id)
			}

			if (!isDefault) {
				drawText(container, 'Тех. обслуживание', flightX1 + flightWidth * 0.5, flightY + FLIGHT_ITEM_HEIGHT * 0.5 + 1, cursor)
			}

			const startDate: Dayjs = flightModel.model.startDate
			const endDate: Dayjs = flightModel.model.endDate
			const timeRotate: number = -19
			appendRotateText(svg, flightX1, flightY, startDate.format('HH:mm'), timeRotate)
			appendRotateText(svg, flightX1 + flightWidth, flightY, endDate.format('HH:mm'), timeRotate)

			const dateRotate: number = 19
			appendRotateText(svg, flightX1, flightY + FLIGHT_ITEM_HEIGHT, startDate.format('DD.MM.YYYY'), dateRotate, 'hanging')
			appendRotateText(svg, flightX1 + flightWidth, flightY + FLIGHT_ITEM_HEIGHT, endDate.format('DD.MM.YYYY'), dateRotate, 'hanging')
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [flightViewModels, flightsSelect])

	return (
		<svg ref={svgRef}>
		</svg>
	)
}

export default Flights