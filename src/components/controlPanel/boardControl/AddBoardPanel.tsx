/**
 * Компонент
 *
 * @author Markitanov Vadim
 * @since 05.12.2023
 */
import React, { ChangeEvent, JSX, useEffect, useState } from 'react'
import { Board } from '../../../models/Board'
import { addBoardFx } from '../../../store/board'
import { Button, Divider, Input, Select, Space } from 'antd'

const AddBoardPanel = (): JSX.Element => {
	const [flightName, setFlightName] = useState<string>('')
	const [addFlightButtonDisable, setAddFlightButtonDisable] = useState<boolean>(true)

	useEffect(() => {
		setAddFlightButtonDisable(flightName === '')
	}, [flightName])

	const handlerAddFlight = (): void => {
		const newBoard: Board = {
			id: -1,
			name: flightName,
			flights: []
		}
		addBoardFx(newBoard)
		setFlightName('')
	}

	const changeFlightName = (e: ChangeEvent<HTMLInputElement>) => {
		setFlightName(e.target.value)
	}

	return (
		<Space direction={'vertical'}>
			<Divider type={'horizontal'} orientation={'left'} className={'control-panel-divider'}>Добавление борта</Divider>
			<Space>
				<span>Название борта:</span>
				<Input placeholder={'Введите название борта'}
					   onChange={changeFlightName}
					   value={flightName}
					   allowClear
				/>
				<span>Тип борта:</span>
				<Select placeholder={'Тип борта'} disabled/>
				<Button type={'primary'}
						disabled={addFlightButtonDisable}
						onClick={handlerAddFlight}>Добавить борт</Button>
			</Space>
		</Space>
	)
}

export default AddBoardPanel