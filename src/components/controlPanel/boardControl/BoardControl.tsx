/**
 * Компонент
 *
 * @author Markitanov Vadim
 * @since 05.12.2023
 */
import React, { JSX } from 'react'
import AddBoardPanel from './AddBoardPanel'
import EditBoardPanel from './EditBoardPanel'
import { useStore } from 'effector-react'
import { $boardSelect } from '../../../store/board'

const BoardControl = (): JSX.Element => {
	const boardSelect = useStore($boardSelect)
	return (
		<>
			{boardSelect === null ? <AddBoardPanel/> : <EditBoardPanel/>}
		</>
	)
}

export default BoardControl