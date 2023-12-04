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
import { FlightType } from '../../../models/FlightType'
import { DATE_FORMAT } from '../../../utils/consts'
import type { RangeValue } from 'rc-picker/lib/interface'
import { $boards, addFlightFx } from '../../../store/board'
import { toast } from 'react-toastify'
import { combineDateTime } from '../../../utils/utils'
import { PlusOutlined } from '@ant-design/icons';

const AddFlightPanel = (): JSX.Element => {
	const boards = useStore($boards)
	const [addFlightButtonDisable, setAddFlightButtonDisable] = useState<boolean>(true)
	const [selectedFlightId, setSelectedFlightId] = useState<number>()
	const [dateRangeValue, setDateRangeValue] = useState<RangeValue<Dayjs> | null>(null)
	const [timeRangeValue, setTimeRangeValue] = useState<RangeValue<Dayjs> | null>(null)
	let options: SelectProps['options'] = []

	boards.forEach(value => {
		options?.push({ value: value.id, label: value.name })
	})

	useEffect(() => {
		setAddFlightButtonDisable(selectedFlightId === undefined || dateRangeValue === null || timeRangeValue === null)
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

	const handlerAddFlight = (): void => {
		if (selectedFlightId === undefined) {
			return
		}
		if (dateRangeValue != null && timeRangeValue != null) {
			const newStartDate: Dayjs = combineDateTime(dateRangeValue[0], timeRangeValue[0])
			const newEndDate: Dayjs = combineDateTime(dateRangeValue[1], timeRangeValue[1])

			if (newStartDate.isBefore(newEndDate)) {
				const newFlight: Flight = {
					id: 'new',
					flightId: selectedFlightId,
					startDate: newStartDate,
					endDate: newEndDate,
					type: FlightType.DEFAULT
				}

				addFlightFx(newFlight)
			} else {
				toast.warn('Время вылета превышает или совпадает с временем прилета.')
			}
		}
	}

	return (
		<Space direction={'vertical'}>
			<Divider type={'horizontal'} orientation={'left'} style={{ margin: '0' }}>Добавление полета</Divider>
			<Space align={'start'}>
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
				</Space>
				<Space direction={'vertical'} align={'end'}>
					<Space>
						<span>Дата:</span>
						<DatePicker.RangePicker value={dateRangeValue}
												onChange={handlerDateChange}
												style={{ minWidth: '300px' }}
												format={DATE_FORMAT}
												picker={'date'}
						/>
					</Space>
					<Space>
						<span>Время:</span>
						<DatePicker.RangePicker value={timeRangeValue}
												onChange={handlerTimeChange}
												style={{ minWidth: '300px' }}
												picker={'time'}
												format={'HH:mm'}
						/>
					</Space>
				</Space>
				<Button type={'primary'}
						icon={<PlusOutlined/>}
						disabled={addFlightButtonDisable}
						onClick={handlerAddFlight}
				>Добавить полет</Button>
			</Space>
		</Space>
	)
}

export default AddFlightPanel