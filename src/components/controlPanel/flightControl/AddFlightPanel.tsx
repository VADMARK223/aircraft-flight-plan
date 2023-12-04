/**
 * Компонент
 *
 * @author Markitanov Vadim
 * @since 04.12.2023
 */
import React, { JSX, useEffect, useState } from 'react'
import { useStore } from 'effector-react'
import { Button, DatePicker, Divider, Select, SelectProps, Space } from 'antd'
import dayjs from 'dayjs'
import { Flight } from '../../../models/Flight'
import { FlightType } from '../../../models/FlightType'
import { DATE_FORMAT } from '../../../utils/consts'
import type { RangeValue } from 'rc-picker/lib/interface'
import { $boards, addFlightFx } from '../../../store/board'

const AddFlightPanel = (): JSX.Element => {
	const boards = useStore($boards)
	const [addFlightButtonDisable, setAddFlightButtonDisable] = useState<boolean>(true)
	const [selectedFlightId, setSelectedFlightId] = useState<number>()
	const [startDate, setStartDate] = useState<string>('')
	const [endDate, setEndDate] = useState<string>('')
	const [startTime, setStartTime] = useState<string>('')
	const [endTime, setEndTime] = useState<string>('')
	let options: SelectProps['options'] = []

	boards.forEach(value => {
		options?.push({ value: value.id, label: value.name })
	})

	useEffect(() => {
		setAddFlightButtonDisable(selectedFlightId === undefined || startDate === '' || endDate === '' || startTime === '' || endTime === '')
	}, [selectedFlightId, startDate, endDate, startTime, endTime])

	const handlerBoardSelectChange = (value: number | undefined): void => {
		setSelectedFlightId(value)
	}

	const handlerDateChange = (values: RangeValue<dayjs.Dayjs> | null, formatString: [string, string]): void => {
		setStartDate(formatString[0])
		setEndDate(formatString[1])
	}

	const handlerTimeChange = (values: RangeValue<dayjs.Dayjs> | null, formatString: [string, string]): void => {
		setStartTime(formatString[0])
		setEndTime(formatString[1])
	}

	const handlerAddFlight = (): void => {
		if (selectedFlightId === undefined) {
			return
		}
		const combinedStartString = `${startDate} ${startTime}`
		const combinedEndString = `${endDate} ${endTime}`
		const newFlight: Flight = {
			id: 'new',
			flightId: selectedFlightId,
			startDate: dayjs(combinedStartString, 'DD.MM.YYYY HH:mm:ss'),
			endDate: dayjs(combinedEndString, 'DD.MM.YYYY HH:mm:ss'),
			type: FlightType.DEFAULT
		}

		addFlightFx(newFlight)
	}

	return (
		<Space direction={'vertical'}>
			<Divider type={'horizontal'} orientation={'left'} style={{ margin: '0' }}>Добавление полета</Divider>
			<Space>
				<span>Борт:</span>
				<Select placeholder={'Выберите борт'}
						options={options}
						style={{ minWidth: '150px' }}
						onChange={handlerBoardSelectChange}
						allowClear
						showSearch
						filterOption={(input, opt) => {
							return (opt?.label !== null && opt?.label !== undefined ? JSON.stringify(opt.label).toLowerCase().includes(input.toLowerCase()) : true)
						}}
				/>
				<span>Дата:</span>
				<DatePicker.RangePicker onChange={handlerDateChange}
										format={DATE_FORMAT}
										picker={'date'}
				/>
				<span>Время:</span>
				<DatePicker.RangePicker onChange={handlerTimeChange}
										picker={'time'}
				/>

				<Button type={'primary'}
						disabled={addFlightButtonDisable}
						onClick={handlerAddFlight}
				>Добавить полет</Button>
			</Space>
		</Space>
	)
}

export default AddFlightPanel