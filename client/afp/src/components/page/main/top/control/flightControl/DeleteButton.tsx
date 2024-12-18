/**
 * Компонент
 *
 * @author Markitanov Vadim
 * @since 18.12.2024
 */
import React, { JSX } from 'react'
import { DeleteOutlined } from '@ant-design/icons'
import { requestDeleteFlightFx } from '../../../../../../api/flight'
import { Button } from 'antd'
import { useStore } from 'effector-react'
import { $flightSelected } from '../../../../../../store/flight'
import { Flight } from '../../../../../../models/Flight'

const DeleteButton = (): JSX.Element => {
	const selectedFlight: Flight | null = useStore($flightSelected)

	return (
		<Button type={'primary'}
				style={{ minWidth: 150 }}
				danger
				icon={<DeleteOutlined/>}
				onClick={() => {
					if (selectedFlight) {
						requestDeleteFlightFx(selectedFlight.id)
					}
				}}>Удалить</Button>
	)
}

export default DeleteButton
