/**
 * Компонент удаления всех бортов.
 *
 * @author Markitanov Vadim
 * @since 07.12.2023
 */
import React, { JSX } from 'react'
import { Button, Popconfirm } from 'antd'
import { $flights, boardsDeleteAllFx } from '../../../store/board'
import { useStore } from 'effector-react'

const DeleteAllButton = (): JSX.Element => {
	const boards = useStore($flights)

	const handlerConfirm = () => {
		boardsDeleteAllFx()
	}

	return (
		<Popconfirm
			title={'Удаление всех бортов.'}
			description={'Вы уверены, что хотите удалить все борты?'}
			okText={'Да'}
			cancelText={'Отмена'}
			onConfirm={handlerConfirm}
		>
			<Button
				type={'primary'}
				danger
				disabled={boards.length === 0}
			>Удалить все</Button>
		</Popconfirm>
	)
}

export default DeleteAllButton
