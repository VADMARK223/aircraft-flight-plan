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
			title={'Delete all flights.'}
			description={'Are you sure you want to delete all flights?'}
			okText={'Yes'}
			cancelText={'Cancel'}
			onConfirm={handlerConfirm}
		>
			<Tooltip title={'Delete all flights'}>
				<Button type={'primary'}
						style={{minWidth: 100}}
						danger
						icon={<CloseOutlined/>}
						disabled={flights.length === 0}
				>Delete all</Button>
			</Tooltip>
		</Popconfirm>
	)
}

export default DeleteAllButton
