/**
 * Компонент контейнера для перелетов.
 *
 * @author Markitanov Vadim
 * @since 03.11.2024
 */
import React, { JSX, LegacyRef, useRef } from 'react'
import { Flight } from '../../../../../models/Flight'
import { Route } from '../../../../../models/Route'
import { CELL_HEIGHT, DATE_ITEM_WIDTH } from '../../../../../utils/consts'
import * as d3 from 'd3'
import RouteItem, { CropType } from './RouteItem'
import ContextMenu from '../../../../common/ContextMenu'
import { routeClickFx } from '../../../../../store/route'
import { useStore } from 'effector-react'
import { $contextMenu } from '../../../../../store/contextMenu'
import { $flights } from '../../../../../store/flight'
import { CommonProps } from '../../../../common/CommonProps'
import { requestDeleteRouteFx } from '../../../../../api/route'
import { useNavigate } from 'react-router-dom'
import { Paths } from '../../../../header/Paths'
import { $canvas } from '../../../../../store/canvas'
import { getRandomNumber } from '../../../../../utils/math'

const Routes = ({ x, y }: CommonProps): JSX.Element => {
	const navigate = useNavigate()
	const gRef: LegacyRef<SVGGElement> = useRef<SVGGElement>(null)
	const contextMenu = useStore($contextMenu)
	const flights: Flight[] = useStore($flights)
	const dates = useStore($canvas).dates
	const canvas = useStore($canvas)

	return (
		<g ref={gRef} id={'routes'} transform={`translate(${x}, ${y})`}>
			{flights.map((flight: Flight, flightIndex) => {
					return (
						<g key={flight.id} id={`flight-row-${flight.id}`}>
							{flight.routes.map((flight: Route) => {
									if (!canvas.dateRange || !canvas.dateRange.every(date => date)) {
										return
									}

									if (canvas.dateRange[0] == null || canvas.dateRange[1] == null) {
										return
									}

									const startDate = canvas.dateRange[0].toDate()
									const endDate = canvas.dateRange[1].add(1, 'day').toDate()
									const rangeEnd = DATE_ITEM_WIDTH * dates.length
									const scaleTime = d3.scaleTime([startDate, endDate], [0, rangeEnd])
									let startX = scaleTime(flight.scheduledDepartureDate.toDate())
									const endX = scaleTime(flight.scheduledArrivalDate.toDate())
									let w = endX - startX
									let cropType = CropType.NONE

									if (endX <= 0 || startX >= rangeEnd) {
										return undefined
									}

									if (startX < 0) {
										startX = 0
										w = endX
										cropType = CropType.START
									}

									if (endX >= rangeEnd) {
										w = rangeEnd - startX
										cropType = CropType.END
									}

									return (
										<RouteItem
											key={flight.id}
											x={startX}
											y={CELL_HEIGHT * flightIndex}
											width={w}
											data={flight}
											cropType={cropType}
											vda={getRandomNumber(100, 1234)}
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
						title: 'Edit',
						action: (datum: Route | Flight) => {
							routeClickFx(datum as Route)
							navigate(Paths.ADMIN)
						}
					}, {
						title: 'Delete',
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
