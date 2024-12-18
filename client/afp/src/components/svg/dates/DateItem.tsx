/**
 * Компонент
 *
 * @author Markitanov Vadim
 * @since 22.11.2023
 */
import React, { JSX, LegacyRef, useEffect, useRef } from 'react'
import { DateModel } from '../../../models/DateModel'
import { DATE_ITEM_HEIGHT, DATE_ITEM_WIDTH } from '../../../utils/consts'
import * as d3 from 'd3'
import { getDayNameByCount } from '../../../utils/utils'
import { useStore } from 'effector-react'
import { $style } from '../../../store/style'

interface DateItemProps {
	data: DateModel
	x: number
	y: number
}

const DateItem = (props: DateItemProps): JSX.Element => {
	const style = useStore($style)
	const { data, x, y } = props
	const width = DATE_ITEM_WIDTH
	const height = DATE_ITEM_HEIGHT
	const gRef: LegacyRef<SVGGElement> = useRef<SVGGElement>(null)
	const date = data.date.format('DD.MM.YYYY')
	const time = data.date.format('HH:mm')

	useEffect(() => {
		const container = d3.select(gRef.current)
		container.append('rect')
			.attr('x', x)
			.attr('y', y)
			.attr('width', width)
			.attr('height', height)
			.attr('stroke', style.lineColor)
			.attr('fill', style.backgroundColor)

		container.append('text')
			.attr('x', x + 5)
			.attr('y', y + 5)
			.attr('fill', style.textColor)
			.attr('font-weight', 'bold')
			.attr('text-anchor', 'start')
			.attr('dominant-baseline', 'hanging')
			.text(date)

		container.append('text')
			.attr('x', x + width - 5)
			.attr('y', y + 5)
			.attr('fill', style.textColor)
			.attr('text-anchor', 'end')
			.attr('dominant-baseline', 'hanging')
			.text(data.title)

		container.append('text')
			.attr('x', x + 5)
			.attr('y', y + height - 5)
			.attr('fill', style.textColor)
			.attr('font-weight', 'bold')
			.attr('text-anchor', 'start')
			.attr('dominant-baseline', 'auto')
			.text(time)

		container.append('text')
			.attr('x', x + width - 5)
			.attr('y', y + height - 5)
			.attr('fill', style.textColor)
			.attr('text-anchor', 'end')
			.attr('dominant-baseline', 'auto')
			.text(getDayNameByCount(data.date.day()))

	}, [style, date, data.date, time, data.title, x, y, width, height])

	return (
		<g ref={gRef}/>
	)
}

export default DateItem
