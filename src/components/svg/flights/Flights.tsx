/**
 * Компонент отображения полетов.
 *
 * @author Markitanov Vadim
 * @since 11.12.2023
 */
import React, { JSX, LegacyRef, useRef } from 'react'
import { useStore } from 'effector-react'
import { $dates, $datesRange } from '../../../store/date'
import { Board } from '../../../models/Board'
import { $boards } from '../../../store/board'
import { $contextMenu } from '../../../store/contextMenu'
import * as d3 from 'd3'
import { BOARD_ITEM_HEIGHT, DATE_ITEM_WIDTH } from '../../../utils/consts'
import { Flight } from '../../../models/Flight'
import FlightItem from '../../frame/flights/FlightItem'
import ContextMenu from '../../frame/flights/ContextMenu'

const Flights = (): JSX.Element => {
	const gRef: LegacyRef<SVGGElement> = useRef<SVGGElement>(null)
	const datesRange = useStore($datesRange)
	const boards: Board[] = useStore($boards)
	const dates = useStore($dates)
	const contextMenu = useStore($contextMenu)

	return (
		<g ref={gRef} id={'flights-layout'}>
			{boards.map((board: Board, boardIndex) =>
				(
					<g key={board.id} id={`board-row-${board.id}`}>
						{board.flights.map((flight: Flight) => {
								if (datesRange == null || datesRange[0] === null || datesRange[1] === null) {
									return undefined
								}

								const startDate = datesRange[0].toDate()
								const endDate = datesRange[1].add(1, 'day').toDate()
								const rangeEnd = DATE_ITEM_WIDTH * dates.length
								const scaleTime = d3.scaleTime([startDate, endDate], [0, rangeEnd])
								let startX = scaleTime(flight.startDate.toDate())
								const endX = scaleTime(flight.endDate.toDate())
								let w = endX - startX

								if (endX <= 0 || startX >= rangeEnd) {
									return undefined
								}

								if (startX <= 0) {
									startX = 0
									w = endX
								}

								return (
									<FlightItem
										key={flight.id}
										x={startX}
										y={BOARD_ITEM_HEIGHT * boardIndex}
										width={w}
										data={flight}
									/>)
							}
						)
						}
					</g>
				)
			)}
			<g id={'context-menu-layout'}>
				{contextMenu && <ContextMenu/>}
			</g>
		</g>
	)
}

export default Flights