/**
 * Компонент
 *
 * @author Markitanov Vadim
 * @since 07.01.2025
 */
import React, { JSX, useState, useEffect } from 'react'
import { Select, Space, Button, Tooltip } from 'antd'
import { useStore } from 'effector-react'
import { $flightSelected } from '../../../../../../store/flight'
import { PlusOutlined, SaveOutlined } from '@ant-design/icons'
import { Flight } from '../../../../../../models/Flight'
import { showError } from '../../../../../../api/common'
import { requestSaveFlightFx, requestAddFlightFx } from '../../../../../../api/flight'
import { EMPTY_FLIGHT } from '../../../../../../utils/flight'
import { $contracts } from '../../../../../../store/contract'

const FlightControlSelect = (): JSX.Element => {
	const store = useStore($contracts)
	const selectedFlight = useStore($flightSelected)
	const [isEditMode, setIsEditMode] = useState<boolean>(false)
	const [currentFlight, setCurrentFlight] = useState<Flight>(EMPTY_FLIGHT)

	const [addSaveButtonDisabled, setAddSaveButtonDisabled] = useState<boolean>(true)
	const [addSaveButtonTooltip, setAddSaveButtonTooltip] = useState<string | null>(null)

	useEffect(() => {
		setIsEditMode(selectedFlight != null)
		setCurrentFlight(selectedFlight ? selectedFlight : EMPTY_FLIGHT)
	}, [selectedFlight])

	useEffect(() => {
		let applyButtonDisabled = true
		if (!isEditMode) {
			if (currentFlight.contract.value !== -1) {
				applyButtonDisabled = false
			}
		} else {
			if (currentFlight.contract.value !== selectedFlight?.contract.value) {
				applyButtonDisabled = false
			}
		}

		setAddSaveButtonDisabled(applyButtonDisabled)
		setAddSaveButtonTooltip(currentFlight.contract.value === selectedFlight?.contract.value ? 'Выберите другой контракт' : 'Сохранить')
	}, [currentFlight])

	const handleAddSaveFlight = () => {
		if (currentFlight.contract.value === -1) {
			showError('Контракт не выбран у рейса.')
			return
		}

		if (isEditMode) {
			requestSaveFlightFx(currentFlight)
		} else {
			requestAddFlightFx(currentFlight.contract)
		}

		resetCurrentFlight()
	}

	const resetCurrentFlight = () => {
		setCurrentFlight(EMPTY_FLIGHT)
	}

	return (
		<Space>
			<span>ID контракта:</span>
			<Select
				placeholder={'Выберите контракт'}
				style={{ width: '160px' }}
				value={currentFlight.contract.value === -1 ? undefined : currentFlight.contract.value}
				options={store}
				allowClear
				onChange={value => {
					setCurrentFlight({ ...currentFlight, contract: { ...currentFlight.contract, value: value } })
				}}
			/>

			<Tooltip title={addSaveButtonTooltip}>
				<Button type={'primary'}
						style={{ minWidth: 150 }}
						icon={isEditMode ? <SaveOutlined/> : <PlusOutlined/>}
						onClick={handleAddSaveFlight}
						disabled={addSaveButtonDisabled}
				>
					{isEditMode ? 'Сохранить' : 'Добавить'}
				</Button>
			</Tooltip>
		</Space>
	)
}

export default FlightControlSelect
