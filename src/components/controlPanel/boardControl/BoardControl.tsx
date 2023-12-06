/**
 * Компонент
 *
 * @author Markitanov Vadim
 * @since 05.12.2023
 */
import React, { ChangeEvent, JSX, useEffect, useState } from 'react'
import { useStore } from 'effector-react'
import { $boardSelect, addBoardFx, deleteBoardFx, editBoardFx, resetBoardSelectFx } from '../../../store/board'
import { Board } from '../../../models/Board'
import { Button, Divider, Input, Select, Space } from 'antd'
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'

const BoardControl = (): JSX.Element => {
	const boardSelect = useStore($boardSelect)
	const [boardName, setBoardName] = useState<string | undefined>(undefined)
	const [addFlightButtonDisable, setAddFlightButtonDisable] = useState<boolean>(true)

	useEffect(() => {
		setBoardName(boardSelect?.name)
	}, [boardSelect])

	useEffect(() => {
		setAddFlightButtonDisable(boardName === undefined || boardName === '')
	}, [boardName])

	const handlerAddBoard = (): void => {
		if (boardName === undefined || boardName === '') {
			return
		}
		const newBoard: Board = {
			id: -1,
			name: boardName,
			flights: []
		}
		addBoardFx(newBoard)
		setBoardName('')
	}

	const handlerEditBoard = (): void => {
		if (boardSelect === null || boardName === undefined || boardName === '') {
			return
		}
		const copy: Board = { ...boardSelect, name: boardName }
		editBoardFx(copy)
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
				<Select placeholder={'Тип борта'} disabled/>
				{boardSelect ?
					<>
						<Button type={'primary'}
								icon={<EditOutlined/>}
								disabled={addFlightButtonDisable}
								onClick={handlerEditBoard}>Изменить борт</Button>
						<Button type={'primary'}
								danger
								icon={<DeleteOutlined/>}
								onClick={() => {
									deleteBoardFx(boardSelect)
									resetBoardSelectFx()
								}}>Удалить борт</Button>
					</>
					:
					<Button type={'primary'}
							disabled={addFlightButtonDisable}
							icon={<PlusOutlined/>}
							onClick={handlerAddBoard}
					>Добавить борт</Button>
				}


			</Space>
		</Space>
	)
}

export default BoardControl