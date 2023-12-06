/**
 * Компонент контроля диапозона дат обображения полетов
 *
 * @author Markitanov Vadim
 * @since 04.12.2023
 */
import React, { JSX } from 'react'
import { Button, DatePicker, Space } from 'antd'
import dayjs from 'dayjs'
import type { RangeValue } from 'rc-picker/lib/interface'
import { DATE_FORMAT } from '../../../utils/consts'
import { $datesRange, updateDatesRangeFx } from '../../../store/date'
import { useStore } from 'effector-react'

const DateControl = (): JSX.Element => {
	const datesRange = useStore($datesRange)
	const handlerDateChange = (values: RangeValue<dayjs.Dayjs> | null): void => {
		if (values && values[0] && values[1]) {
			const newStartDate = values[0].startOf('day')
			const newEndDate = values[1].startOf('day')
			updateDatesRangeFx([newStartDate, newEndDate])
		}
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
			<Button type={'primary'} onClick={() => {
				handlerDateChange([dayjs(), dayjs()])
			}}>Сегодня</Button>
			<Button type={'primary'} onClick={() => {
				handlerDateChange([dayjs().add(1, 'days'), dayjs().add(1, 'days')])
			}}>Завтра</Button>
		</Space>
	)
}

export default DateControl