/**
 * Компонент удаления всех бортов.
 *
 * @author Markitanov Vadim
 * @since 07.12.2023
 */
import React, { JSX } from 'react'
import { Button, Popconfirm } from 'antd'
import { $flights, flightsDeleteAllFx } from '../../../store/flight'
import { useStore } from 'effector-react'
import { LOCAL_MODE } from '../../../utils/consts'
import { requestDeleteAllFlightsFx } from '../../../api/flight'

const DeleteAllButton = (): JSX.Element => {
	const boards = useStore($flights)

	const handlerConfirm = () => {
		if (LOCAL_MODE) {
			flightsDeleteAllFx()
		} else {
			requestDeleteAllFlightsFx()
		}
	}

	return (
		<Popconfirm
			title={'Удаление всех рейсов.'}
			description={'Вы уверены, что хотите удалить все рейсы?'}
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
