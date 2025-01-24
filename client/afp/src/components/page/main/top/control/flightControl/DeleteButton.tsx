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
import { $flightsSelected } from '../../../../../../store/flight'

const DeleteButton = (): JSX.Element => {
	const flightsSelected = useStore($flightsSelected)
	const lastFlightSelected = flightsSelected.at(-1)

	return (
		<Button type={'primary'}
				danger
				icon={<DeleteOutlined/>}
				onClick={() => {
					if (lastFlightSelected) {
						requestDeleteFlightFx(lastFlightSelected.id)
					}
				}}/>
	)
}

export default DeleteButton
