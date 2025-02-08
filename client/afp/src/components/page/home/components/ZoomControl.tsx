/**
 * Компонент зума временной шкалы.
 *
 * @author Markitanov Vadim
 * @since 08.02.2025
 */
import React, { JSX, useState, useEffect } from 'react'
import { updateDatesRangeFx } from '../../../../store/date'
import dayjs from 'dayjs'
import { CheckboxOptionType, Space, Radio } from 'antd'
import type { RangeValueType } from 'rc-picker/lib/PickerInput/RangePicker'
import { ZoomMode, $canvas } from '../../../../store/canvas'
import { useStore } from 'effector-react'

const ZoomControl = (): JSX.Element => {
	const canvas = useStore($canvas)
	const [zoomMode, setZoomMode] = useState<ZoomMode>(canvas.mode)

	useEffect(() => {
		switch (zoomMode) {
			case ZoomMode.DAYS:
				setDateChange([dayjs(), dayjs().add(1, 'days')])
				break
			case ZoomMode.WEEK:
				setDateChange([dayjs(), dayjs()])
				break
			case ZoomMode.DAY:
				setDateChange([dayjs().add(1, 'days'), dayjs().add(1, 'days')])
				break
		}
	}, [zoomMode])

	const setDateChange = (values: RangeValueType<dayjs.Dayjs> | null): void => {
		if (values && values[0] && values[1]) {
			updateDatesRangeFx([values[0].startOf('day'), values[1].startOf('day')])
		}
	}

	const dateControlModeOptions: CheckboxOptionType[] = [
		{ label: 'Days', value: ZoomMode.DAYS },
		{ label: 'Week', value: ZoomMode.WEEK },
		{ label: 'Day', value: ZoomMode.DAY }
	]

	return (
		<Space>
			<span>Zoom mode:</span>
			<Radio.Group
				options={dateControlModeOptions}
				value={zoomMode}
				onChange={(e) => setZoomMode(e.target.value)}
				optionType={'button'}
				buttonStyle={'solid'}
			/>
		</Space>
	)
}

export default ZoomControl
