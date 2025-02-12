/**
 * Компонент контейнера для рейсов.
 *
 * @author Markitanov Vadim
 * @since 03.11.2024
 */
import React, { JSX } from 'react'
import { useStore } from 'effector-react'
import { CELL_HEIGHT, FLIGHT_CELL_WIDTH } from '../../../../utils/consts'
import { CommonProps } from '../../../common/CommonProps'
import FlightItem from './flight/FlightItem'
import ContextMenu from '../../../common/ContextMenu'
import { Route } from '../../../../models/Route'
import { Flight } from '../../../../models/Flight'
import { $flights, flightClickFx, flightDeleteFx } from '../../../../store/flight'
import { $contextMenu } from '../../../../store/contextMenu'
import { Paths } from '../../../header/Paths'
import { useNavigate } from 'react-router-dom'

const Flights = ({ x, y }: CommonProps): JSX.Element => {
	const navigate = useNavigate()
	const flights = useStore($flights)
	const contextMenu = useStore($contextMenu)

	return (
		<g id={'flights'} transform={`translate(${x}, ${y})`}>
			{flights.map((value, index) => (
				<FlightItem key={value.id}
							data={value}
							x={0}
							y={CELL_HEIGHT * index}
							width={FLIGHT_CELL_WIDTH}
							height={CELL_HEIGHT}/>))}

			<g id={'context-menu-layout'}>
				{contextMenu && !contextMenu.isFlight && <ContextMenu menuItems={[
					{
						title: 'Edit',
						action: (datum: Route | Flight) => {
							flightClickFx(datum as Flight)
							navigate(Paths.ADMIN)
						}
					}, {
						title: 'Delete',
						action: (datum: Route | Flight) => {
							flightDeleteFx((datum as Flight).id)
						}
					}
				]}/>}
			</g>
		</g>

	)
}

export default Flights
