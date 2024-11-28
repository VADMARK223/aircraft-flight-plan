/**
 * Компонент работы с бортами.
 *
 * @author Markitanov Vadim
 * @since 05.12.2023
 */
import React, { ChangeEvent, JSX, useEffect, useState } from 'react'
import { useStore } from 'effector-react'
import { $flightSelect, boardAddFx, boardDeleteFx, boardEditFx } from '../../../store/board'
import { Flight } from '../../../models/Flight'
import { Button, Divider, Input, Select, SelectProps, Space } from 'antd'
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import DeleteAllButton from './DeleteAllButton'
import { FlightType } from '../../../models/FlightType'

const BoardControl = (): JSX.Element => {
	const board = useStore($flightSelect)
	const [boardName, setBoardName] = useState<string | undefined>(undefined)
	const [boardType, setBoardType] = useState<FlightType>(FlightType.DEFAULT)
	const [addFlightButtonDisable, setAddFlightButtonDisable] = useState<boolean>(true)

	useEffect(() => {
		setBoardName(board?.name)
		setBoardType(board ? board.type : FlightType.DEFAULT)
	}, [board])

	useEffect(() => {
		setAddFlightButtonDisable(boardName === undefined || boardName === '')
	}, [boardName])

	const boardTypeSelectOptions: SelectProps['options'] = [
		{ value: FlightType.LOW, label: 'Неприоритетный' },
		{ value: FlightType.DEFAULT, label: 'Обычный' },
		{ value: FlightType.PRIORITY, label: 'Приоритетный' }
	]

	const handlerAddBoard = (): void => {
		if (boardName === undefined || boardName === '') {
			return
		}
		const newBoard: Flight = {
			id: -1,
			name: boardName,
			type: boardType,
			routes: []
		}
		boardAddFx(newBoard)
		setBoardName('')
	}

	const handlerEditBoard = (): void => {
		if (board !== null && boardName !== undefined && boardName !== '') {
			boardEditFx({ ...board, name: boardName, type: boardType })
		}
	}

	const changeFlightName = (e: ChangeEvent<HTMLInputElement>) => {
		setBoardName(e.target.value)
	}

	return (
		<Space direction={'vertical'}>
			<Divider type={'horizontal'} orientation={'left'} className={'control-panel-divider'}>Добавление
				борта</Divider>
			<Space>
				<span>Название борта:</span>
				<Input placeholder={'Введите название борта'}
					   onChange={changeFlightName}
					   value={boardName}
					   allowClear
				/>
				<span>Тип борта:</span>
				<Select<FlightType>
					placeholder={'Тип борта'}
					style={{ width: '160px' }}
					defaultValue={FlightType.DEFAULT}
					value={boardType}
					options={boardTypeSelectOptions}
					onChange={setBoardType}
				/>
				{board ?
					<>
						<Button type={'primary'}
								icon={<EditOutlined/>}
								disabled={addFlightButtonDisable}
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
							disabled={addFlightButtonDisable}
							icon={<PlusOutlined/>}
							onClick={handlerAddBoard}
					>Добавить борт</Button>
				}
				<DeleteAllButton/>
			</Space>
		</Space>
	)
}

export default BoardControl
