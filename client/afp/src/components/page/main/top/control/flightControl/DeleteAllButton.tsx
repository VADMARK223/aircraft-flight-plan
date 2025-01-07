/**
 * Компонент удаления всех рейсов.
 *
 * @author Markitanov Vadim
 * @since 07.12.2023
 */
import React, { JSX } from 'react'
import { Button, Popconfirm, Tooltip } from 'antd'
import { $flights } from '../../../../../../store/flight'
import { useStore } from 'effector-react'
import { requestDeleteAllFlightsFx } from '../../../../../../api/flight'
import { CloseOutlined } from '@ant-design/icons'

const DeleteAllButton = (): JSX.Element => {
	const flights = useStore($flights)

	const handlerConfirm = () => {
		requestDeleteAllFlightsFx()
	}

	return (
		<Popconfirm
			title={'Удаление всех рейсов.'}
			description={'Вы уверены, что хотите удалить все рейсы?'}
			okText={'Да'}
			cancelText={'Отмена'}
			onConfirm={handlerConfirm}
		>
			<Tooltip title={'Удалить все рейсы'}>
				<Button type={'primary'}
						style={{minWidth: 150}}
						danger
						icon={<CloseOutlined/>}
						disabled={flights.length === 0}
				>Удалить все</Button>
			</Tooltip>
		</Popconfirm>
	)
}

export default DeleteAllButton
