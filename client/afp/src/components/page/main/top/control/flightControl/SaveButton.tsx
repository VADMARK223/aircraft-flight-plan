/**
 * Компонент
 *
 * @author Markitanov Vadim
 * @since 18.12.2024
 */
import React, { JSX, useState, useEffect } from 'react'
import { Button } from 'antd'
import { SaveOutlined } from '@ant-design/icons'
import { Flight } from '../../../../../../models/Flight'
import { useStore } from 'effector-react'
import { $flightSelected } from '../../../../../../store/flight'
import { requestSaveFlightFx } from '../../../../../../api/flight'
import { DictData } from '../../../../../../models/DictData'

interface SaveButtonProps {
	contract: DictData | null
}

const SaveButton = ({ contract }: SaveButtonProps): JSX.Element => {
	const selectedFlight: Flight | null = useStore($flightSelected)

	const [editButtonDisabled, setEditButtonDisabled] = useState<boolean>(true)

	const handlerEditFlight = (): void => {
		if (contract != null && selectedFlight?.id) {
			const editedFlight = { ...selectedFlight, contract: contract }
			requestSaveFlightFx(editedFlight)
			setEditButtonDisabled(true)
		}
	}

	useEffect((): void => {
		setEditButtonDisabled(contract == null || selectedFlight?.contract.value === contract.value)
	}, [contract, selectedFlight?.contract.value])

	return (
		<Button type={'primary'}
				style={{ minWidth: 150 }}
				icon={<SaveOutlined/>}
				disabled={editButtonDisabled}
				onClick={handlerEditFlight}>Сохранить
		</Button>
	)
}

export default SaveButton
