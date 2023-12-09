/**
 * Компонент
 *
 * @author Markitanov Vadim
 * @since 09.12.2023
 */
import React, { JSX } from 'react'
import BoardItem from './BoardItem'
import { BOARD_ITEM_HEIGHT, BOARD_ITEM_WIDTH } from '../../utils/consts'
import { useStore } from 'effector-react'
import { $boards } from '../../store/board'

const Boards = (): JSX.Element => {
	const boards = useStore($boards)

	return (
		<g cursor={'pointer'} id={'BOARDS'}>
			{boards.map((value, index) => (
				<BoardItem key={value.id}
						   data={value}
						   x={0}
						   y={BOARD_ITEM_HEIGHT * index}
						   width={BOARD_ITEM_WIDTH}
						   height={BOARD_ITEM_HEIGHT}/>))}
		</g>
	)
}

export default Boards