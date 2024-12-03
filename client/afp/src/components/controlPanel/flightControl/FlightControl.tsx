/**
 * Компонент работы с бортами.
 *
 * @author Markitanov Vadim
 * @since 05.12.2023
 */
import React, { JSX, useEffect, useState } from 'react'
import { useStore } from 'effector-react'
import { $selectedFlight, flightAddFx, flightDeleteFx } from '../../../store/flight'
import { Flight } from '../../../models/Flight'
import { Button, Divider, Space, Select } from 'antd'
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import DeleteAllButton from './DeleteAllButton'
import { LOCAL_MODE } from '../../../utils/consts'
import { requestAddFlightFx, requestDeleteFlightFx } from '../../../api/flight'
import { fetchContracts } from '../../../api/dict'
import { DictData } from '../../../models/DictData'

const FlightControl = (): JSX.Element => {
	const selectedFlight = useStore($selectedFlight)
	const [title, setTitle] = useState<string>()
	const [contractId, setContractId] = useState<number | undefined>()
	const [contractOptions, setContractOptions] = useState<DictData[]>([])

	useEffect(() => {
		fetchContracts().then(contracts => {
			if (contracts.length !== 0) {
				setContractOptions(contracts)
			}
		})
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
		// if (board !== null && boardName !== undefined && boardName !== '') {
		// 	boardEditFx({ ...board, name: boardName, type: boardType })
		// }
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
					onChange={value => setContractId(value)}
				/>
				{selectedFlight ?
					<>
						<Button type={'primary'}
								icon={<EditOutlined/>}
								onClick={handlerEditFlight}>Изменить рейс</Button>
						<Button type={'primary'}
								danger
								icon={<DeleteOutlined/>}
								onClick={() => {
									if (LOCAL_MODE) {
										flightDeleteFx(selectedFlight?.id)
									} else {
										requestDeleteFlightFx(selectedFlight?.id)
									}
								}}>Удалить рейс</Button>
					</>
					:
					<Button type={'primary'}
							icon={<PlusOutlined/>}
							onClick={handlerAddFlight}
					>Добавить рейс</Button>
				}
				<DeleteAllButton/>
			</Space>
		</Space>
	)
}

export default FlightControl
