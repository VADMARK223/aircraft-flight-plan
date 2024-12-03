/**
 * Компонент работы с бортами.
 *
 * @author Markitanov Vadim
 * @since 05.12.2023
 */
import React, { JSX, useEffect, useState, ChangeEvent } from 'react'
import { useStore } from 'effector-react'
import { $flightSelect, flightAddFx, boardDeleteFx } from '../../../store/flight'
import { Flight } from '../../../models/Flight'
import { Button, Divider, Space, Input } from 'antd'
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import DeleteAllButton from './DeleteAllButton'
import { LOCAL_MODE } from '../../../utils/consts'
import { requestAddFlightFx } from '../../../api/flight'

const FlightControl = (): JSX.Element => {
	const board = useStore($flightSelect)
	const [contractId, setContractId] = useState<string | undefined>('888')
	// const [boardType, setBoardType] = useState<FlightType>(FlightType.DEFAULT)
	// const [addFlightButtonDisable, setAddFlightButtonDisable] = useState<boolean>(true)

	useEffect(() => {
		// setBoardName(board?.name)
		// setBoardType(board ? board.type : FlightType.DEFAULT)
	}, [board])

	// useEffect(() => {
	// 	setAddFlightButtonDisable(boardName === undefined || boardName === '')
	// }, [boardName])

	// const boardTypeSelectOptions: SelectProps['options'] = [
	// 	{ value: FlightType.LOW, label: 'Неприоритетный' },
	// 	{ value: FlightType.DEFAULT, label: 'Обычный' },
	// 	{ value: FlightType.PRIORITY, label: 'Приоритетный' }
	// ]

	const handlerAddFlight = (): void => {
		// if (boardName === undefined || boardName === '') {
		// 	return
		// }
		const newFlight: Flight = {
			id: -1,
			// name: boardName,
			// type: boardType,
			routes: []
		}
		if (LOCAL_MODE) {
			flightAddFx(newFlight)
		} else {
			requestAddFlightFx(Number(contractId))
		}
		// setBoardName('')
	}

	const handlerEditBoard = (): void => {
		// if (board !== null && boardName !== undefined && boardName !== '') {
		// 	boardEditFx({ ...board, name: boardName, type: boardType })
		// }
	}

	const changeContractId = (e: ChangeEvent<HTMLInputElement>) => {
		setContractId(e.target.value)
	}

	return (
		<Space direction={'vertical'}>
			<Divider type={'horizontal'} orientation={'left'} className={'control-panel-divider'}>Добавление
				рейса</Divider>
			<Space>
				<span>Идентификатор контракта:</span>
				<Input placeholder={'Введите идентификатор контракта'}
					   onChange={changeContractId}
					   value={contractId}
					   allowClear
				/>
				<span>Тип рейса:</span>
				{/*<Select<FlightType>
					placeholder={'Тип рейса'}
					style={{ width: '160px' }}
					defaultValue={FlightType.DEFAULT}
					value={boardType}
					options={boardTypeSelectOptions}
					onChange={setBoardType}
				/>*/}
				{board ?
					<>
						<Button type={'primary'}
								icon={<EditOutlined/>}
							// disabled={addFlightButtonDisable}
								onClick={handlerEditBoard}>Изменить борт</Button>
						<Button type={'primary'}
								danger
								icon={<DeleteOutlined/>}
								onClick={() => {
									boardDeleteFx(board)
								}}>Удалить борт</Button>
					</>
					:
					<Button type={'primary'}
						// disabled={addFlightButtonDisable}
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
