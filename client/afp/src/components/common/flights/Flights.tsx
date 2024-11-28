/**
 * Компонент отображения рейсов.
 *
 * @author Markitanov Vadim
 * @since 11.12.2023
 */
import React, { JSX } from 'react'
import { useStore } from 'effector-react'
import { $boards, boardClickFx, boardDeleteFx } from '../../../store/board'
import FlightItem from './FlightItem'
import { BOARD_ITEM_HEIGHT, BOARD_ITEM_WIDTH } from '../../../utils/consts'
import ContextMenu from '../ContextMenu'
import { $contextMenu } from '../../../store/contextMenu'
import { Flight } from '../../../models/Flight'
import { Board } from '../../../models/Board'

const Flights = (): JSX.Element => {
	const boards = useStore($boards)
	const contextMenu = useStore($contextMenu)

	return (
		<g id={'BOARDS'}>
			{boards.map((value, index) => (
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
						action: (datum: Flight | Board) => {
							boardClickFx(datum as Board)
						}
					}, {
						title: 'Удалить',
						action: (datum: Flight | Board) => {
							boardDeleteFx(datum as Board)
						}
					}
				]}/>}
			</g>
		</g>
	)
}

export default Flights
