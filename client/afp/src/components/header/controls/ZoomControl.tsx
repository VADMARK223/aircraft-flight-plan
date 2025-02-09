/**
 * Компонент зума временной шкалы.
 *
 * @author Markitanov Vadim
 * @since 08.02.2025
 */
import React, { JSX, useState, useEffect } from 'react'
import { CheckboxOptionType, Space, Radio, Button } from 'antd'
import { ZoomMode, $canvas, zoomModeChanged } from '../../../store/canvas'
import { useStore } from 'effector-react'
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons'

const SHOW_TOGGLE_BUTTONS = false

const ZoomControl = (): JSX.Element => {
	const canvas = useStore($canvas)
	const [zoomMode, setZoomMode] = useState<ZoomMode>(canvas.zoomMode)
	const [minusDisabled, setMinusDisabled] = useState<boolean>(false)
	const [plusDisabled, setPlusDisabled] = useState<boolean>(false)

	useEffect(() => {
		zoomModeChanged(zoomMode)
		setPlusDisabled(zoomMode === ZoomMode.DAY)
		setMinusDisabled(zoomMode === ZoomMode.WEEKS)
	}, [zoomMode])

	const dateControlModeOptions: CheckboxOptionType[] = [
		{ label: '2 weeks', value: ZoomMode.WEEKS },
		{ label: 'Week', value: ZoomMode.WEEK },
		{ label: 'Day', value: ZoomMode.DAY }
	]

	const handlerMinusClick = (): void => {
		switch (zoomMode) {
			case ZoomMode.DAY:
				setZoomMode(ZoomMode.WEEK)
				break
			case ZoomMode.WEEK:
				setZoomMode(ZoomMode.WEEKS)
				break
		}
	}

	const handlerPlusClick = (): void => {
		switch (zoomMode) {
			case ZoomMode.WEEKS:
				setZoomMode(ZoomMode.WEEK)
				break
			case ZoomMode.WEEK:
				setZoomMode(ZoomMode.DAY)
				break
		}
	}

	return (
		<Space>
			{SHOW_TOGGLE_BUTTONS && (<Radio.Group
				options={dateControlModeOptions}
				value={zoomMode}
				onChange={(e) => setZoomMode(e.target.value)}
				optionType={'button'}
				buttonStyle={'solid'}
			/>)}
			<Space.Compact>
				<Button type={'primary'}
						icon={<MinusCircleOutlined/>}
						disabled={minusDisabled}
						onClick={handlerMinusClick}/>
				<Button type={'primary'}
						icon={<PlusCircleOutlined/>}
						disabled={plusDisabled}
						onClick={handlerPlusClick}/>
			</Space.Compact>
		</Space>
	)
}

export default ZoomControl
