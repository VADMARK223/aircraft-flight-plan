/**
 * Компонент просмотра диапазона дат.
 *
 * @author Markitanov Vadim
 * @since 09.02.2025
 */
import React, { JSX, useEffect } from 'react'
import { useStore } from 'effector-react'
import { $canvas, ZoomMode, datesRangeChanged } from '../../../store/canvas'
import dayjs from 'dayjs'
import type { RangeValueType } from 'rc-picker/lib/PickerInput/RangePicker'
import { Space, DatePicker } from 'antd'
import { DATE_FORMAT } from '../../../utils/consts'

const RangeViewer = (): JSX.Element => {
	const canvas = useStore($canvas)

	useEffect(() => {
		switch (canvas.zoomMode) {
			case ZoomMode.WEEKS:
				setDateChange([dayjs(), dayjs().add(2, 'weeks')])
				break
			case ZoomMode.WEEK:
				setDateChange([dayjs(), dayjs().add(1, 'weeks')])
				break
			case ZoomMode.DAY:
				setDateChange([dayjs(), dayjs().add(1, 'days')])
				break
		}
	}, [canvas.zoomMode])

	const setDateChange = (values: RangeValueType<dayjs.Dayjs> | null): void => {
		if (values && values[0] && values[1]) {
			datesRangeChanged([values[0].startOf('day'), values[1].startOf('day')])
		}
	}

	return (
		<Space>
			<DatePicker.RangePicker value={canvas.dateRange}
									onChange={setDateChange}
									style={{ width: '210px' }}
									format={DATE_FORMAT}
									picker={'date'}
									disabled
									allowClear={false}
			/>

		</Space>
	)
}

export default RangeViewer
