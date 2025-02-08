/**
 * Компонент зума временной шкалы.
 *
 * @author Markitanov Vadim
 * @since 08.02.2025
 */
import React, { JSX, useState, useEffect } from 'react'
import { CheckboxOptionType, Space, Radio } from 'antd'
import { ZoomMode, $canvas, zoomModeChanged } from '../../../../store/canvas'
import { useStore } from 'effector-react'

const ZoomControl = (): JSX.Element => {
	const canvas = useStore($canvas)
	const [zoomMode, setZoomMode] = useState<ZoomMode>(canvas.mode)

	useEffect(() => {
		zoomModeChanged(zoomMode)
	}, [zoomMode])

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
