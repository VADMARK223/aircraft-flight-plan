/**
 * Компонент контроля диапозона дат обображения полетов
 *
 * @author Markitanov Vadim
 * @since 04.12.2023
 */
import React, { JSX, useEffect, useState } from 'react'
import { DatePicker, Space } from 'antd'
import dayjs from 'dayjs'
import type { RangeValue } from 'rc-picker/lib/interface'
import { DATE_FORMAT } from '../../../utils/consts'
import { $datesRange, updateDatesRangeFx } from '../../../store/date'
import { useStore } from 'effector-react'
import { CheckboxOptionType, Radio } from 'antd/lib'

enum DateControlMode {
	TODAY_TOMORROW,
	TODAY,
	TOMORROW
}

const defaultDateControlMode = DateControlMode.TODAY_TOMORROW

const DateControl = (): JSX.Element => {
	const datesRange = useStore($datesRange)
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

	const setDateChange = (values: RangeValue<dayjs.Dayjs> | null): void => {
		if (values && values[0] && values[1]) {
			updateDatesRangeFx([values[0].startOf('day'), values[1].startOf('day')])
		}
	}

	const dateControlModeOptions: CheckboxOptionType[] = [
		{ label: 'Сегодня-завтра', value: DateControlMode.TODAY_TOMORROW },
		{ label: 'Сегодня', value: DateControlMode.TODAY },
		{ label: 'Завтра', value: DateControlMode.TOMORROW }
	]

	return (
		<Space>
			<span>Диапозон дат:</span>
			<DatePicker.RangePicker value={datesRange}
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
		</Space>
	)
}

export default DateControl