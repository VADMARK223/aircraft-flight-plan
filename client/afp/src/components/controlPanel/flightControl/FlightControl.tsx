/**
 * Компонент работы с бортами.
 *
 * @author Markitanov Vadim
 * @since 05.12.2023
 */
import React, { JSX, useEffect, useState } from 'react'
import { useStore } from 'effector-react'
import { $selectedFlight, flightAddFx, boardDeleteFx } from '../../../store/flight'
import { Flight } from '../../../models/Flight'
import { Button, Divider, Space, Select } from 'antd'
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import DeleteAllButton from './DeleteAllButton'
import { LOCAL_MODE } from '../../../utils/consts'
import { requestAddFlightFx } from '../../../api/flight'
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
				// setContractId(contracts[0].value)
			}
		})
	}, [])

	useEffect(() => {
		if (selectedFlight) {
			setTitle('Изменение рейса')
		} else {
			setTitle('Добавление рейса')
		}
	}, [selectedFlight])

	const handlerAddFlight = (): void => {
		const newFlight: Flight = {
			id: -1,
			routes: []
		}
		if (LOCAL_MODE) {
			flightAddFx(newFlight)
		} else {
			requestAddFlightFx(Number(contractId))
		}
	}

	const handlerEditBoard = (): void => {
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
								onClick={handlerEditBoard}>Изменить борт</Button>
						<Button type={'primary'}
								danger
								icon={<DeleteOutlined/>}
								onClick={() => {
									boardDeleteFx(selectedFlight)
								}}>Удалить борт</Button>
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
