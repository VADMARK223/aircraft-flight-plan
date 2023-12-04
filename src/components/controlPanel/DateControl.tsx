/**
 * Компонент контроля диапозона дат обображения полетов
 *
 * @author Markitanov Vadim
 * @since 04.12.2023
 */
import React, { JSX } from 'react'
import { DatePicker, Space } from 'antd'
import dayjs from 'dayjs'
import type { RangeValue } from 'rc-picker/lib/interface'
import { DATE_FORMAT } from '../../utils/consts'
import { $datesRange, updateDatesRangeFx } from '../../store/date'
import { useStore } from 'effector-react'

const DateControl = (): JSX.Element => {
	const datesRange = useStore($datesRange)
	// if (datesRange) {
	// 	console.log('Нач:', datesRange[0]?.format(FULL_TIME_FORMAT))
	// 	console.log('Кон:', datesRange[1]?.format(FULL_TIME_FORMAT))
	// }

	const handlerDateChange = (values: RangeValue<dayjs.Dayjs> | null): void => {
		if (values && values[0] && values[1]) {
			const newStartDate = values[0].startOf('day')
			const newEndDate = values[1].startOf('day')
			// console.log('Нов. нач:', newStartDate.format(FULL_TIME_FORMAT))
			// console.log('Нов. кон:', newEndDate.format(FULL_TIME_FORMAT))
			updateDatesRangeFx([newStartDate, newEndDate])
		}
		// setDateRangeValue(values)
	}

	return (
		<Space>
			<span>Диапозон дат:</span>
			<DatePicker.RangePicker value={datesRange}
									onChange={handlerDateChange}
									style={{ minWidth: '300px' }}
									format={DATE_FORMAT}
									picker={'date'}
									allowClear={false}
			/>
		</Space>
	)
}

export default DateControl