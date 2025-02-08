/**
 * Компонент контроля диапазона дат отображения полетов
 *
 * @author Markitanov Vadim
 * @since 04.12.2023
 */
import React, { JSX, useEffect, useState } from 'react'
import { DatePicker, Space, CheckboxOptionType, Radio } from 'antd'
import dayjs from 'dayjs'
import type { RangeValueType } from 'rc-picker/lib/PickerInput/RangePicker'
import { DATE_FORMAT } from '../../../../../utils/consts'
import { useStore } from 'effector-react'
import { $canvas, ZoomMode, datesRangeChanged } from '../../../../../store/canvas'

enum DateControlMode {
	TODAY_TOMORROW,
	TODAY,
	TOMORROW,
	CUSTOM
}

const defaultDateControlMode = DateControlMode.TODAY_TOMORROW

const DateControl = (): JSX.Element => {
	const canvas = useStore($canvas)
	const [dateControlMode, setDateControlMode] = useState<DateControlMode>(defaultDateControlMode)

	useEffect(() => {
		switch (dateControlMode) {
			case DateControlMode.TODAY_TOMORROW:
				setDateChange([dayjs(), dayjs().add(1, 'days')])
				break
			case DateControlMode.TODAY:
				setDateChange([dayjs(), dayjs()])
				break
			case DateControlMode.TOMORROW:
				setDateChange([dayjs().add(1, 'days'), dayjs().add(1, 'days')])
				break
		}
	}, [dateControlMode])

	useEffect(() => {
		const startDate = canvas.dateRange[0]
		const finishDate = canvas.dateRange[1]
		const isToday = dayjs().isSame(startDate, 'day') && dayjs().isSame(finishDate, 'day')
		const isTodayTomorrow = dayjs().isSame(startDate, 'day') && dayjs().add(1, 'days').isSame(finishDate, 'day')
		const isTomorrow = dayjs().add(1, 'days').isSame(startDate, 'day') && dayjs().add(1, 'days').isSame(finishDate, 'day')
		if (isToday) {
			setDateControlMode(DateControlMode.TODAY)
		} else if (isTodayTomorrow) {
			setDateControlMode(DateControlMode.TODAY_TOMORROW)
		} else if (isTomorrow) {
			setDateControlMode(DateControlMode.TOMORROW)
		} else {
			setDateControlMode(DateControlMode.CUSTOM)
		}
	}, [canvas.dateRange])

	const setDateChange = (values: RangeValueType<dayjs.Dayjs> | null): void => {
		if (values && values[0] && values[1]) {
			datesRangeChanged([values[0].startOf('day'), values[1].startOf('day')])
		}
	}

	const dateControlModeOptions: CheckboxOptionType[] = [
		{ label: 'Today-tomorrow', value: DateControlMode.TODAY_TOMORROW },
		{ label: 'Today', value: DateControlMode.TODAY },
		{ label: 'Tomorrow', value: DateControlMode.TOMORROW },
		{ label: 'Custom', value: DateControlMode.CUSTOM, disabled: true }
	]

	return (
		<>
			{canvas.mode === ZoomMode.DAY
				? <Space>
					<span>Date range:</span>
					<DatePicker.RangePicker value={canvas.dateRange}
											onChange={setDateChange}
											style={{ minWidth: '300px' }}
											format={DATE_FORMAT}
											picker={'date'}
											allowClear={false}
					/>
					<Radio.Group
						options={dateControlModeOptions}
						value={dateControlMode}
						onChange={(e) => setDateControlMode(e.target.value)}
						optionType={'button'}
						buttonStyle={'solid'}
					/>
				</Space> : null}

		</>

	)
}

export default DateControl
