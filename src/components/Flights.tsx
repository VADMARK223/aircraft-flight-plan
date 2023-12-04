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
	DATE_ITEM_HEIGHT,
	DATE_ITEM_WIDTH,
	FLIGHT_ITEM_HEIGHT,
	HEADER_HEIGHT,
	MINUTES_IN_CELL,
	SHOW_FLIGHT_ID
} from '../utils/consts'
import * as d3 from 'd3'
import { appendDateText, dateToX, drawText } from '../utils/utils'
import { FlightType } from '../models/FlightType'
import { $flightsSelect, flightClickFx } from '../store/flight'
import { $boards } from '../store/board'

const Flights = (): JSX.Element => {
	const boards: Board[] = useStore($boards)
	const flightsSelect = useStore($flightsSelect)
	const svgRef: LegacyRef<any> = useRef<SVGSVGElement | undefined>()

	const [flightViewModels, setFlightViewModels] = useState<FlightViewModel[]>()

	useEffect(() => {
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
			const isSelect = flightModel.model.id === flightsSelect?.id
			const cursor: string = 'pointer'
			const isDefault = flightModel.model.type === FlightType.DEFAULT

			const flightX1 = dateToX(flightModel.model.startDate)
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

			appendDateText(svg, flightX1, flightY, flightModel.model.startDate)
			appendDateText(svg, flightX1 + flightWidth, flightY, flightModel.model.endDate)
		})
	}, [flightViewModels, flightsSelect])

	return (
		<svg ref={svgRef}>
		</svg>
	)
}

export default Flights