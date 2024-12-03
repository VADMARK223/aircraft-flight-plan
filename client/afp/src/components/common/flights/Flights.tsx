/**
 * Компонент отображения рейсов.
 *
 * @author Markitanov Vadim
 * @since 11.12.2023
 */
import React, { JSX } from 'react'
import { useStore } from 'effector-react'
import { $flights, boardClickFx, flightDeleteFx } from '../../../store/flight'
import FlightItem from './FlightItem'
import { BOARD_ITEM_HEIGHT, BOARD_ITEM_WIDTH } from '../../../utils/consts'
import ContextMenu from '../ContextMenu'
import { $contextMenu } from '../../../store/contextMenu'
import { Route } from '../../../models/Route'
import { Flight } from '../../../models/Flight'

const Flights = (): JSX.Element => {
	const flights = useStore($flights)
	const contextMenu = useStore($contextMenu)

	return (
		<g id={'FLIGHTS'}>
			{flights.map((value, index) => (
				<FlightItem key={value.id}
							data={value}
							x={0}
							y={BOARD_ITEM_HEIGHT * index}
							width={BOARD_ITEM_WIDTH}
							height={BOARD_ITEM_HEIGHT}/>))}

			<g id={'context-menu-layout'}>
				{contextMenu && !contextMenu.isFlight && <ContextMenu menuItems={[
					{
						title: 'Редактировать',
						action: (datum: Route | Flight) => {
							boardClickFx(datum as Flight)
						}
					}, {
						title: 'Удалить',
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
