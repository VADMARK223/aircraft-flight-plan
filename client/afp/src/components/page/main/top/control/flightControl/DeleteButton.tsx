/**
 * Компонент
 *
 * @author Markitanov Vadim
 * @since 18.12.2024
 */
import React, { JSX } from 'react'
import { DeleteOutlined } from '@ant-design/icons'
import { requestDeleteFlightFx } from '../../../../../../api/flight'
import { Button, Tooltip } from 'antd'
import { useStore } from 'effector-react'
import { $flightsSelected } from '../../../../../../store/flight'

const DeleteButton = (): JSX.Element => {
	const flightsSelected = useStore($flightsSelected)
	const lastFlightSelected = flightsSelected.at(-1)

	return (
		<Tooltip title={`Удалить рейс: ${lastFlightSelected?.contract.value}`}>
			<Button type={'primary'}
					style={{ minWidth: 150 }}
					danger
					icon={<DeleteOutlined/>}
					onClick={() => {
						if (lastFlightSelected) {
							requestDeleteFlightFx(lastFlightSelected.id)
						}
					}}>Delete</Button>
		</Tooltip>
	)
}

export default DeleteButton
