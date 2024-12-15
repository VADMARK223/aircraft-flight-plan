/**
 * Компонент добавления/изменения рейсов.
 *
 * @author Markitanov Vadim
 * @since 05.12.2023
 */
import React, { JSX, useEffect, useState } from 'react'
import { useStore } from 'effector-react'
import { $flightSelected } from '../../../store/flight'
import { Button, Divider, Space } from 'antd'
import { DeleteOutlined, SaveOutlined, PlusOutlined } from '@ant-design/icons'
import DeleteAllButton from './DeleteAllButton'
import { requestDeleteFlightFx, requestAddFlightFx, requestSaveFlightFx } from '../../../api/flight'
import { DictData } from '../../../models/DictData'
import ContractModal from './ContractModal'

const FlightControl = (): JSX.Element => {
	const selectedFlight = useStore($flightSelected)
	const [title, setTitle] = useState<string>()
	const [contract, setContract] = useState<DictData | null>(null)
	const [addButtonDisabled, setAddButtonDisabled] = useState<boolean>(true)
	const [editButtonDisabled, setEditButtonDisabled] = useState<boolean>(true)
	const [resetSelection, setResetSelection] = useState<boolean>(false)

	useEffect((): void => {
		setTitle(selectedFlight != null ? `Изменение рейса ${selectedFlight.id}` : 'Добавление рейса')
	}, [selectedFlight])

	useEffect((): void => {
		setAddButtonDisabled(contract == null)
		setEditButtonDisabled(contract == null || selectedFlight?.contract.value === contract.value)
	}, [contract, selectedFlight?.contract.value])

	const handlerAddFlight = (): void => {
		if (contract == null) {
			return
		}
		requestAddFlightFx(contract)

		setContract(null)
		setResetSelection(true)
	}

	const handlerEditFlight = (): void => {
		if (contract != null && selectedFlight?.id) {
			const editedFlight = { ...selectedFlight, contract: contract }
			requestSaveFlightFx(editedFlight)
			setEditButtonDisabled(true)
		}
	}

	return (
		<Space direction={'vertical'} style={{ width: '100%' }}>
			<Divider type={'horizontal'}
					 orientation={'left'}
					 className={'control-panel-divider'}>{title}</Divider>
			<Space>
				<ContractModal flight={selectedFlight}
							   onApply={(contract: DictData): void => {
								   setContract(contract)
							   }}
							   resetSelection={resetSelection}
							   onReset={() => setResetSelection(false)}
				/>

				{selectedFlight ?
					<>
						<Button type={'primary'}
								icon={<SaveOutlined/>}
								disabled={editButtonDisabled}
								onClick={handlerEditFlight}>Сохранить</Button>
						<Button type={'primary'}
								danger
								icon={<DeleteOutlined/>}
								onClick={() => {
									requestDeleteFlightFx(selectedFlight?.id)
								}}>Удалить</Button>
					</>
					:
					<Button type={'primary'}
							icon={<PlusOutlined/>}
							onClick={handlerAddFlight}
							disabled={addButtonDisabled}
					>Добавить</Button>
				}
				<DeleteAllButton/>
			</Space>
		</Space>
	)
}

export default FlightControl
