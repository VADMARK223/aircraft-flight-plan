/**
 * Компонент контейнера для перелетов.
 *
 * @author Markitanov Vadim
 * @since 03.11.2024
 */
import React, { JSX, LegacyRef, useRef } from 'react'
import { Flight } from '../../../../models/Flight'
import { Route } from '../../../../models/Route'
import { CELL_HEIGHT, DATE_ITEM_WIDTH } from '../../../../utils/consts'
import * as d3 from 'd3'
import RouteItem from '../../../common/routes/RouteItem'
import ContextMenu from '../../../common/ContextMenu'
import { routeClickFx } from '../../../../store/route'
import { useStore } from 'effector-react'
import { $contextMenu } from '../../../../store/contextMenu'
import { $flights } from '../../../../store/flight'
import { $dates, $datesRange } from '../../../../store/date'
import { CommonProps } from '../../../common/CommonProps'
import { requestDeleteRouteFx } from '../../../../api/route'

const Routes = ({ x, y }: CommonProps): JSX.Element => {
	const gRef: LegacyRef<SVGGElement> = useRef<SVGGElement>(null)
	const contextMenu = useStore($contextMenu)
	const flights: Flight[] = useStore($flights)
	const dates = useStore($dates)
	const datesRange = useStore($datesRange)

	return (
		<g ref={gRef} id={'routes'} transform={`translate(${x}, ${y})`}>
			{flights.map((flight: Flight, flightIndex) => {
					return (
						<g key={flight.id} id={`flight-row-${flight.id}`}>
							{flight.routes.map((flight: Route) => {
									if (!datesRange || !datesRange.every(date => date)) {
										return
									}

									if (datesRange[0] == null || datesRange[1] == null) {
										return
									}

									const startDate = datesRange[0].toDate()
									const endDate = datesRange[1].add(1, 'day').toDate()
									const rangeEnd = DATE_ITEM_WIDTH * dates.length
									const scaleTime = d3.scaleTime([startDate, endDate], [0, rangeEnd])
									let startX = scaleTime(flight.scheduledDepartureDate.toDate())
									const endX = scaleTime(flight.scheduledArrivalDate.toDate())
									let w = endX - startX

									if (endX <= 0 || startX >= rangeEnd) {
										return undefined
									}

									if (startX <= 0) {
										startX = 0
										w = endX
									}

									return (
										<RouteItem
											key={flight.id}
											x={startX}
											y={CELL_HEIGHT * flightIndex}
											width={w}
											data={flight}
										/>)
								}
							)
							}
						</g>
					)
				}
			)}
			<g id={'context-menu-layout'}>
				{contextMenu && contextMenu.isFlight && <ContextMenu menuItems={[
					{
						title: 'Редактировать',
						action: (datum: Route | Flight) => {
							routeClickFx(datum as Route)
						}
					}, {
						title: 'Удалить',
						action: (datum: Route | Flight) => {
							requestDeleteRouteFx((datum as Route).id)
						}
					}
				]}/>}
			</g>
		</g>
	)
}

export default Routes
