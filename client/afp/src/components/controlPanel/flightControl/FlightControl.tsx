/**
 * Компонент работы с рейсами.
 *
 * @author Markitanov Vadim
 * @since 05.12.2023
 */
import React, { JSX, useEffect, useState } from 'react'
import { useStore } from 'effector-react'
import { $selectedFlight, flightAddFx, flightDeleteFx, flightSaveFx } from '../../../store/flight'
import { Flight } from '../../../models/Flight'
import { Button, Divider, Space, Select } from 'antd'
import { DeleteOutlined, SaveOutlined, PlusOutlined } from '@ant-design/icons'
import DeleteAllButton from './DeleteAllButton'
import { LOCAL_MODE } from '../../../utils/consts'
import { requestAddFlightFx, requestDeleteFlightFx, requestSaveFlightFx } from '../../../api/flight'
import { fetchContracts } from '../../../api/dict'
import { DictDto } from '../../../models/dto/DictDto'

const FlightControl = (): JSX.Element => {
	const selectedFlight = useStore($selectedFlight)
	const [title, setTitle] = useState<string>()
	const [contractId, setContractId] = useState<number | undefined>()
	const [contractOptions, setContractOptions] = useState<DictDto[]>([])
	const [addButtonDisabled, setAddButtonDisabled] = useState<boolean>(true)
	const [editButtonDisabled, setEditButtonDisabled] = useState<boolean>(true)

	useEffect(() => {
		if(!LOCAL_MODE) {
			fetchContracts().then(contracts => {
				if (contracts.length !== 0) {
					setContractOptions(contracts)
				}
			})
		}
	}, [])

	useEffect(() => {
		if (selectedFlight) {
			setTitle('Изменение рейса')
			setContractId(selectedFlight.contractId)
		} else {
			setTitle('Добавление рейса')
			setContractId(undefined)
		}
	}, [selectedFlight])

	useEffect(() => {
		setAddButtonDisabled(contractId === undefined)
		setEditButtonDisabled(contractId === undefined || selectedFlight?.contractId === contractId)
	}, [contractId, selectedFlight?.contractId])

	const handlerAddFlight = (): void => {
		if (contractId === undefined) {
			return
		}
		const newFlight: Flight = {
			id: -1,
			routes: [],
			contractId: contractId
		}
		if (LOCAL_MODE) {
			flightAddFx(newFlight)
		} else {
			requestAddFlightFx(Number(contractId))
		}
	}

	const handlerEditFlight = (): void => {
		if (contractId !== undefined && selectedFlight?.id) {
			const editedFlight = { ...selectedFlight, contractId: contractId }
			if (LOCAL_MODE) {
				flightSaveFx(editedFlight)
			} else {
				requestSaveFlightFx(editedFlight)
			}
			setEditButtonDisabled(true)
		}
	}

	return (
		<Space direction={'vertical'}>
			<Divider type={'horizontal'} orientation={'left'} className={'control-panel-divider'}>{title}</Divider>
			<Space>
				<span>ID контракта:</span>
				<Select
					placeholder={'Выберите контракт'}
					style={{ width: '160px' }}
					value={contractId}
					options={contractOptions}
					allowClear
					onChange={value => setContractId(value)}
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
									if (LOCAL_MODE) {
										flightDeleteFx(selectedFlight?.id)
									} else {
										requestDeleteFlightFx(selectedFlight?.id)
									}
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
