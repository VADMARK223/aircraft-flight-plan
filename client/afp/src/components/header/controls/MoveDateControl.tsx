/**
 * Компонент
 *
 * @author Markitanov Vadim
 * @since 09.02.2025
 */
import React, { JSX, useState } from 'react'
import { Button, Space, Tooltip } from 'antd'
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons'
import { ZoomMode, $canvas, datesRangeChanged } from '../../../store/canvas'
import { useStore } from 'effector-react'

const MoveDateControl = (): JSX.Element => {
	const canvas = useStore($canvas)
	const zoomMode = canvas.zoomMode
	const dateRange = canvas.dateRange
	const [forwardButtonTooltip, setForwardButtonTooltip] = useState<string>('Вперед')
	const [backButtonTooltip, setBackButtonTooltip] = useState<string>('Назад')

	const handlerMinusClick = (): void => {
		const start = dateRange[0]
		const end = dateRange[1]

		if (!start || !end) {
			return
		}

		switch (zoomMode) {
			case ZoomMode.DAY:
				datesRangeChanged([start.subtract(1, 'day'), end.subtract(1, 'day')])
				break
			case ZoomMode.WEEK:
				datesRangeChanged([start.subtract(1, 'week'), end.subtract(1, 'week')])
				break
			case ZoomMode.WEEKS:
				datesRangeChanged([start.subtract(2, 'week'), end.subtract(2, 'week')])
				break
		}
	}

	const handlerPlusClick = (): void => {
		const start = dateRange[0]
		const end = dateRange[1]
		if (!start || !end) {
			return
		}
		switch (zoomMode) {
			case ZoomMode.DAY:
				datesRangeChanged([start.add(1, 'day'), end.add(1, 'day')])
				break
			case ZoomMode.WEEK:
				datesRangeChanged([start.add(1, 'week'), end.add(1, 'week')])
				break
			case ZoomMode.WEEKS:
				datesRangeChanged([start.add(2, 'week'), end.add(2, 'week')])
				break
		}
	}

	return (
		<Space.Compact>
			<Tooltip title={backButtonTooltip}>
				<Button type={'primary'}
						icon={<LeftCircleOutlined/>}
						onClick={handlerMinusClick}/>
			</Tooltip>

			<Tooltip title={forwardButtonTooltip}>
				<Button type={'primary'}
						icon={<RightCircleOutlined/>}
						onClick={handlerPlusClick}/>
			</Tooltip>
		</Space.Compact>
	)
}

export default MoveDateControl
