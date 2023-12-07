/**
 * Компонент
 *
 * @author Markitanov Vadim
 * @since 04.12.2023
 */
import React, { JSX, LegacyRef, useEffect, useRef, useState } from 'react'
import { Board } from '../../models/Board'
import { useStore } from 'effector-react'
import {
	BOARD_ITEM_HEIGHT,
	BOARD_ITEM_WIDTH,
	DATE_ITEM_WIDTH,
	FLIGHT_ITEM_HEIGHT,
	MINUTES_IN_CELL,
	SHOW_FLIGHT_ID
} from '../../utils/consts'
import * as d3 from 'd3'
import { appendRotateText, dateToNew, drawText, xToDate } from '../../utils/utils'
import { FlightType } from '../../models/FlightType'
import { $flightsSelect, flightClickFx } from '../../store/flight'
import { $boards } from '../../store/board'
import { $datesRange } from '../../store/date'
import { Dayjs } from 'dayjs'
import { greenColor } from '../../utils/style'
import { $style, StyleStore } from '../../store/style'
import { FlightViewModel } from '../../models/FlightViewModel'
import { ContextMenuViewModel } from './ContextMenuViewModel'
import { createContextMenu } from './contextMenu'

export const FLIGHTS_G_ID = 'flights-g-id'

const Flights = (): JSX.Element => {
	const style: StyleStore = useStore($style)
	const datesRange = useStore($datesRange)
	const boards: Board[] = useStore($boards)
	const flightsSelect = useStore($flightsSelect)
	const gRef: LegacyRef<SVGGElement> = useRef<SVGGElement>(null)
	const [flightViewModels, setFlightViewModels] = useState<FlightViewModel[]>()
	const [contextMenu, setContextMenu] = useState<ContextMenuViewModel | null>(null)
	const contextMenuRef = useRef(contextMenu)
	useEffect(() => {
		contextMenuRef.current = contextMenu
	}, [contextMenu])

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

		const viewModelsForRender: FlightViewModel[] = []
		boards.forEach((value, index) => {
			if (!value.flights) {
				return undefined
			}
			value.flights.forEach((flight) => {
				const flightViewModel: FlightViewModel = { ...flight, index: index }

				const startDate = flightViewModel.startDate
				const endDate = flightViewModel.endDate
				const newEndRange = endRange.add(1, 'days')

				if (
					endDate.isAfter(startRange)
					&& startDate.isBefore(newEndRange)
				) {
					viewModelsForRender.push(flightViewModel)
				}
			})
		})
		setFlightViewModels(viewModelsForRender)

	}, [boards, datesRange])

	useEffect(() => {
		const svg = d3.select(gRef.current)
		svg.selectAll('*').remove()
		flightViewModels?.forEach(flightModel => {
			const isSelect = flightModel.id === flightsSelect?.id
			const cursor: string = 'pointer'
			const isDefault = flightModel.type === FlightType.DEFAULT

			let x = dateToNew(datesRange, flightModel.startDate)
			if (x <= BOARD_ITEM_WIDTH) {
				x = BOARD_ITEM_WIDTH
			}

			let endX = dateToNew(datesRange, flightModel.endDate)

			const flightDurationMinutes = xToDate(endX).diff(xToDate(x), 'minutes')
			const flightWidth = DATE_ITEM_WIDTH / MINUTES_IN_CELL * flightDurationMinutes
			const y = BOARD_ITEM_HEIGHT * flightModel.index + (BOARD_ITEM_HEIGHT - FLIGHT_ITEM_HEIGHT) * 0.5

			const container = svg.append('g').attr('class', 'flight_item')
				.on('click', (_: PointerEvent) => {
					flightClickFx(flightModel)
				})
				.on('contextmenu', (event: PointerEvent) => {
					event.preventDefault()
					if (!contextMenuRef.current) {
						setContextMenu({ offsetX: event.offsetX, offsetY: event.offsetY, model: flightModel })
					}
				})

			container.append('rect')
				.attr('x', x)
				.attr('y', y)
				.attr('width', flightWidth)
				.attr('height', FLIGHT_ITEM_HEIGHT)
				.attr('stroke', isSelect ? 'red' : isDefault ? 'green' : 'orange')
				.attr('stroke-width', isSelect ? '3' : '1')
				.attr('fill', isDefault ? greenColor : 'orange')
				.attr('cursor', cursor)

			if (SHOW_FLIGHT_ID) {
				container.append('text')
					.attr('x', x + 5)
					.attr('y', y)
					.attr('fill', style.textColor)
					.attr('text-anchor', 'start')
					.attr('dominant-baseline', 'hanging')
					.attr('cursor', cursor)
					.text(flightModel.id)
			}

			if (!isDefault) {
				drawText(container, 'Тех. обслуживание', x + flightWidth * 0.5, y + FLIGHT_ITEM_HEIGHT * 0.5 + 1, cursor)
			}

			const startDate: Dayjs = flightModel.startDate
			const endDate: Dayjs = flightModel.endDate
			const timeRotate: number = -19
			appendRotateText(svg, style.textColor, x, y, startDate.format('HH:mm'), timeRotate)
			appendRotateText(svg, style.textColor, x + flightWidth, y, endDate.format('HH:mm'), timeRotate)

			const dateRotate: number = 19
			appendRotateText(svg, style.textColor, x, y + FLIGHT_ITEM_HEIGHT, startDate.format('DD.MM.YYYY'), dateRotate, 'hanging')
			appendRotateText(svg, style.textColor, x + flightWidth, y + FLIGHT_ITEM_HEIGHT, endDate.format('DD.MM.YYYY'), dateRotate, 'hanging')
		})

		if (contextMenuRef.current) {
			createContextMenu(style, contextMenuRef.current?.offsetX, contextMenuRef.current?.offsetY, contextMenuRef.current?.model, () => {
				setContextMenu(null)
			})
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [style, flightViewModels, flightsSelect, contextMenu])

	return (
		<g ref={gRef} id={FLIGHTS_G_ID}>

		</g>
	)
}

export default Flights