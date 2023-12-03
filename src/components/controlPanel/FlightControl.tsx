/**
 * Компонент управлением полета
 *
 * @author Markitanov Vadim
 * @since 23.11.2023
 */
import React, { JSX, useEffect, useState } from 'react'
import { Button, DatePicker, Select, SelectProps, Space } from 'antd'
import { useStore } from 'effector-react'
import dayjs from 'dayjs'
import type { RangeValue } from 'rc-picker/lib/interface'
import { Flight } from '../../models/Flight'
import { FlightType } from '../../models/FlightType'
import { DATE_FORMAT } from '../../utils/consts'
import { $boards, addFlightFx } from '../../api/board'

const FlightControl = (): JSX.Element => {
	const boards = useStore($boards)
	const [addFlightButtonDisable, setAddFlightButtonDisable] = useState<boolean>(true)
	const [selectedFlightId, setSelectedFlightId] = useState<number>()
	// const [startDetectionDate, setStartDetectionDate] = useState(dayjs())
	// const [endDetectionDate, setEndDetectionDate] = useState(dayjs().add(1, 'days'))
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
				// value={[startDetectionDate, endDetectionDate]}
			/>
			<span>Время:</span>
			<DatePicker.RangePicker onChange={handlerTimeChange}
				// format={DATE_FORMAT}
									picker={'time'}
				// value={[startDetectionDate, endDetectionDate]}
			/>

			<Button type={'primary'}
					disabled={addFlightButtonDisable}
					onClick={handlerAddFlight}
			>Добавить полет</Button>
		</Space>
	)
}

export default FlightControl