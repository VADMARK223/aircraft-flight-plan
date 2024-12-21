/**
 * Компонент добавления/изменения рейсов.
 *
 * @author Markitanov Vadim
 * @since 05.12.2023
 */
import React, { JSX, useEffect, useState } from 'react'
import { useStore } from 'effector-react'
import { $flightSelected } from '../../../../../../store/flight'
import { Button, Divider, Space } from 'antd'
import { SaveOutlined, PlusOutlined } from '@ant-design/icons'
import DeleteAllButton from './DeleteAllButton'
import ContractModal from './ContractModal'
import { Flight } from '../../../../../../models/Flight'
import { showError } from '../../../../../../api/common'
import { requestAddFlightFx, requestSaveFlightFx } from '../../../../../../api/flight'
import DeleteButton from './DeleteButton'

export const emptyFlight: Flight = {
	id: -1,
	contract: { value: -1, label: 'Пустой контракт' },
	routes: []
}

const FlightControl = (): JSX.Element => {
	const selectedFlight = useStore($flightSelected)
	const [title, setTitle] = useState<string>()
	const [addSaveButtonDisabled, setAddSaveButtonDisabled] = useState<boolean>(true)
	const inFlightState = useState<Flight>(emptyFlight)  // Выходящий рейс
	const outFlightState = useState<Flight>(emptyFlight)  // Выходящий рейс
	const [isNewFlight, setIsNewFlight] = useState<boolean>(true)

	useEffect((): void => {
		setTitle(selectedFlight != null ? `Изменение рейса ${selectedFlight.id} (Контракт: ${selectedFlight.contract.value})` : 'Добавление рейса')
	}, [selectedFlight])

	useEffect(() => {
		setIsNewFlight(inFlightState[0].id === -1)
	}, [inFlightState[0]])

	// Настройка доступности кнопки применения
	useEffect(() => {
		let result: boolean
		// Если новый рейс и у него выбран контракт
		if (isNewFlight && outFlightState[0].contract.value !== -1) {
			result = false
		} else {
			result = inFlightState[0].contract.value === outFlightState[0].contract.value
		}
		setAddSaveButtonDisabled(result)
	}, [inFlightState[0], outFlightState[0]])

	/**
	 * Хендлер добавления/сохранения рейса
	 */
	const handleAddSaveFlight = (): void => {
		if (outFlightState[0] == null) {
			showError('Рейс пустой.')
			return
		}

		if (outFlightState[0].contract.value === -1) {
			showError('Контракт не выбран у рейса.')
			return
		}

		if (isNewFlight) {
			requestAddFlightFx(outFlightState[0].contract)
		} else {
			requestSaveFlightFx(outFlightState[0])
		}

		outFlightState[1](emptyFlight)
	}

	/**
	 * Хендлер применения в модальном окне
	 * @param {boolean} autoAddSave - флаг авто добавления / сохранения.
	 */
	const handleModalApply = (autoAddSave: boolean): void => {
		if (autoAddSave) {
			handleAddSaveFlight()
		}
	}

	return (
		<Space direction={'vertical'} style={{ width: '100%' }}>
			<Divider type={'horizontal'}
					 orientation={'left'}
					 className={'control-panel-divider'}>{title}</Divider>
			<Space>
				<ContractModal selectedFlight={selectedFlight}
							   inFlightState={inFlightState}
							   outFlightState={outFlightState}
							   onApply={handleModalApply}
							   applyButtonDisabled={addSaveButtonDisabled}
							   isNewFlight={isNewFlight}
				/>

				<Button type={'primary'}
						style={{ minWidth: 150 }}
						icon={isNewFlight ? <PlusOutlined/> : <SaveOutlined/>}
						onClick={handleAddSaveFlight}
						disabled={addSaveButtonDisabled}
				>{isNewFlight ? 'Добавить' : 'Сохранить'}</Button>

				{selectedFlight ? <DeleteButton/> : undefined}
				<DeleteAllButton/>
			</Space>
		</Space>
	)
}

export default FlightControl
