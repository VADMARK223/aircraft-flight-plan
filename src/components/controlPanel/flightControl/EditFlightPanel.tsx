/**
 * Компонент
 *
 * @author Markitanov Vadim
 * @since 04.12.2023
 */
import React, { JSX, useEffect, useState } from 'react'
import { useStore } from 'effector-react'
import { Button, DatePicker, Divider, Select, SelectProps, Space } from 'antd'
import dayjs, { Dayjs } from 'dayjs'
import { Flight } from '../../../models/Flight'
import { DATE_FORMAT } from '../../../utils/consts'
import type { RangeValue } from 'rc-picker/lib/interface'
import { editFlightFx } from '../../../store/flight'
import { toast } from 'react-toastify'
import { $boards } from '../../../store/board'
import { combineDateTime } from '../../../utils/utils'
import { EditOutlined } from '@ant-design/icons';

interface EditFlightPanelProps {
	data: Flight
}

const EditFlightPanel = (props: EditFlightPanelProps): JSX.Element => {
	const { data } = props
	const boards = useStore($boards)
	const [editFlightButtonDisable, setEditFlightButtonDisable] = useState<boolean>(true)
	const [selectedFlightId, setSelectedFlightId] = useState<number | undefined>()
	const [dateRangeValue, setDateRangeValue] = useState<RangeValue<Dayjs> | null>(null)
	const [timeRangeValue, setTimeRangeValue] = useState<RangeValue<Dayjs> | null>(null)
	let options: SelectProps['options'] = []

	useEffect(() => {
		setSelectedFlightId(data.flightId)
		setDateRangeValue([data.startDate, data.endDate])
		setTimeRangeValue([data.startDate, data.endDate])
	}, [data])

	boards.forEach(value => {
		options?.push({ value: value.id, label: value.name })
	})

	useEffect(() => {
		setEditFlightButtonDisable(selectedFlightId === undefined || dateRangeValue === null || timeRangeValue === null)
	}, [selectedFlightId, dateRangeValue, timeRangeValue])

	const handlerBoardSelectChange = (value: number | undefined): void => {
		setSelectedFlightId(value)
	}

	const handlerDateChange = (values: RangeValue<dayjs.Dayjs> | null): void => {
		setDateRangeValue(values)
	}

	const handlerTimeChange = (values: RangeValue<dayjs.Dayjs> | null): void => {
		setTimeRangeValue(values)
	}

	/**
	 * Метод подтверждения изменения полета.
	 */
	const handlerEditFlight = (): void => {
		if (dateRangeValue != null && timeRangeValue != null) {
			const newStartDate: Dayjs = combineDateTime(dateRangeValue[0], timeRangeValue[0])
			const newEndDate: Dayjs = combineDateTime(dateRangeValue[1], timeRangeValue[1])
			if (newStartDate.isBefore(newEndDate)) {
				editFlightFx({ ...data, startDate: newStartDate, endDate: newEndDate })
			} else {
				toast.warn('Время вылета превышает или совпадает с временем прилета.')
			}
		}
	}

	return (
		<Space direction={'vertical'}>
			<Divider type={'horizontal'} orientation={'left'} style={{ margin: '0' }}>Изменение полета</Divider>
			<Space align={'start'}>
				<Space>
					<span>Борт:</span>
					<Select placeholder={'Выберите борт'}
							value={selectedFlightId}
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
				<Space direction={'vertical'} align={'end'}>
					<Space>
						<span>Дата:</span>
						<DatePicker.RangePicker value={dateRangeValue}
												style={{ minWidth: '300px' }}
												onChange={handlerDateChange}
												format={DATE_FORMAT}
												picker={'date'}
						/>
					</Space>
					<Space>
						<span>Время:</span>
						<DatePicker.RangePicker value={timeRangeValue}
												style={{ minWidth: '300px' }}
												onChange={handlerTimeChange}
												picker={'time'}
												format={'HH:mm'}
						/>
					</Space>
				</Space>

				<Button type={'primary'}
						icon={<EditOutlined/>}
						disabled={editFlightButtonDisable}
						onClick={handlerEditFlight}
				>Изменить полет</Button>
			</Space>
		</Space>
	)
}

export default EditFlightPanel