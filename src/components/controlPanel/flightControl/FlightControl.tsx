/**
 * Компонент управлением полета
 *
 * @author Markitanov Vadim
 * @since 23.11.2023
 */
import React, { JSX, useEffect, useState } from 'react'
import { useStore } from 'effector-react'
import { $flightsSelect, editFlightFx, flightDeleteFx, resetFlightSelectFx } from '../../../store/flight'
import { $boards, addFlightFx } from '../../../store/board'
import { Dayjs } from 'dayjs'
import { Button, DatePicker, Divider, Input, Select, SelectProps, Space } from 'antd'
import { combineDateTime } from '../../../utils/utils'
import { toast } from 'react-toastify'
import { DATE_FORMAT } from '../../../utils/consts'
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import type { RangeValue } from 'rc-picker/lib/interface'
import { Flight } from '../../../models/Flight'
import { FlightType } from '../../../models/FlightType'

const FlightControl = (): JSX.Element => {
	const flight = useStore($flightsSelect)
	const boards = useStore($boards)
	const [editFlightButtonDisable, setEditFlightButtonDisable] = useState<boolean>(true)
	const [boardId, setBoardId] = useState<number | undefined>()
	const [flightId, setFlightId] = useState<string | undefined>()
	const [dateRangeValue, setDateRangeValue] = useState<RangeValue<Dayjs> | null>(null)
	const [timeRangeValue, setTimeRangeValue] = useState<RangeValue<Dayjs> | null>(null)
	let options: SelectProps['options'] = []

	useEffect(() => {
		setBoardId(flight?.boardId)
		setFlightId(flight?.id)
		if (flight) {
			setDateRangeValue([flight.startDate, flight.endDate])
			setTimeRangeValue([flight.startDate, flight.endDate])
		} else {
			setDateRangeValue(null)
			setTimeRangeValue(null)
		}

	}, [flight])

	boards.forEach(value => {
		options?.push({ value: value.id, label: value.name })
	})

	useEffect(() => {
		setEditFlightButtonDisable(boardId === undefined || flightId === undefined || flightId === '' || dateRangeValue === null || timeRangeValue === null)
	}, [boardId, flightId, dateRangeValue, timeRangeValue])

	const handlerBoardSelectChange = (value: number | undefined): void => {
		setBoardId(value)
	}

	/**
	 * Метод подтверждения добавления полета.
	 */
	const handlerAddFlight = (): void => {
		if (boardId === undefined || dateRangeValue === null || timeRangeValue === null) {
			return
		}

		const newStartDate: Dayjs = combineDateTime(dateRangeValue[0], timeRangeValue[0])
		const newEndDate: Dayjs = combineDateTime(dateRangeValue[1], timeRangeValue[1])

		if (flightId === undefined || flightId === '') {
			return
		}
		if (newStartDate.isBefore(newEndDate)) {
			const newFlight: Flight = {
				id: flightId,
				boardId: boardId,
				startDate: newStartDate,
				endDate: newEndDate,
				type: FlightType.DEFAULT
			}

			addFlightFx(newFlight)
		} else {
			toast.warn('Время вылета превышает или совпадает с временем прилета.')
		}

		setBoardId(undefined)
		setFlightId(undefined)
		setDateRangeValue(null)
		setTimeRangeValue(null)
	}

	/**
	 * Метод подтверждения изменения полета.
	 */
	const handlerEditFlight = (): void => {
		if (dateRangeValue != null && timeRangeValue != null) {
			const newStartDate: Dayjs = combineDateTime(dateRangeValue[0], timeRangeValue[0])
			const newEndDate: Dayjs = combineDateTime(dateRangeValue[1], timeRangeValue[1])
			if (newStartDate.isBefore(newEndDate)) {
				if (flightId !== undefined && flightId !== '' && boardId && flight) {
					editFlightFx({ ...flight, id: flightId, startDate: newStartDate, endDate: newEndDate })
				}
			} else {
				toast.warn('Время вылета превышает или совпадает с временем прилета.')
			}
		}
	}

	return (
		<Space direction={'vertical'}>
			<Divider type={'horizontal'}
					 orientation={'left'}
					 className={'control-panel-divider'}>Изменение полета</Divider>
			<Space align={'start'}>
				<Space direction={'vertical'} align={'end'}>
					<Space>
						<span>Борт:</span>
						<Select placeholder={'Выберите борт'}
								disabled={flight !== null}
								value={boardId}
								options={options}
								style={{ minWidth: '150px' }}
								onChange={handlerBoardSelectChange}
								allowClear
								showSearch
								filterOption={(input, opt) => {
									return (opt?.label !== null && opt?.label !== undefined ? JSON.stringify(opt.label).toLowerCase().includes(input.toLowerCase()) : true)
								}}
						/>
					</Space>
					<Space>
						<span>Полет:</span>
						<Input
							value={flightId}
							onChange={(event) => {
								setFlightId(event.target.value)
							}}
							style={{ width: '150px' }}
							allowClear
							disabled={flight !== null}
						/>
					</Space>
				</Space>
				<Space direction={'vertical'} align={'end'}>
					<Space>
						<span>Дата:</span>
						<DatePicker.RangePicker value={dateRangeValue}
												style={{ minWidth: '300px' }}
												onChange={setDateRangeValue}
												format={DATE_FORMAT}
												picker={'date'}
						/>
					</Space>
					<Space>
						<span>Время:</span>
						<DatePicker.RangePicker value={timeRangeValue}
												style={{ minWidth: '300px' }}
												onChange={setTimeRangeValue}
												picker={'time'}
												format={'HH:mm'}
						/>
					</Space>
				</Space>

				{flight ?
					<>
						<Button type={'primary'}
								icon={<EditOutlined/>}
								disabled={editFlightButtonDisable}
								onClick={handlerEditFlight}
						>Изменить полет</Button>
						<Button type={'primary'}
								danger
								icon={<DeleteOutlined/>}
								onClick={() => {
									flightDeleteFx(flight.id)
									resetFlightSelectFx()
								}}
						>Удалить полет</Button>
					</>
					:
					<Button type={'primary'}
							icon={<PlusOutlined/>}
							disabled={editFlightButtonDisable}
							onClick={handlerAddFlight}
					>Добавить полет</Button>
				}


			</Space>
		</Space>
	)
}

export default FlightControl