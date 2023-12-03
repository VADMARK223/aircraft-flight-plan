/**
 * Компонент
 *
 * @author Markitanov Vadim
 * @since 22.11.2023
 */
import { JSX, LegacyRef, useEffect, useRef } from 'react'
import { DateModel } from '../models/DateModel'
import { DATE_ITEM_HEIGHT, DATE_ITEM_WIDTH } from '../utils/consts'
import * as d3 from 'd3'

interface DateItemProps {
	data: DateModel
	x: number
	y: number
}

const DateItem = (props: DateItemProps): JSX.Element => {
	const { data, x, y } = props
	const width = DATE_ITEM_WIDTH
	const height = DATE_ITEM_HEIGHT
	const fill = 'white'
	const svgRef: LegacyRef<any> = useRef<SVGSVGElement | undefined>()
	const date = data.date.format('DD.MM.YYYY')
	const time = data.date.format('HH:mm')

	useEffect(() => {
		const svg = d3.select(svgRef.current)
		svg.append('rect')
			.attr('x', x)
			.attr('y', y)
			.attr('width', width)
			.attr('height', height)
			.attr('stroke', 'black')
			.attr('fill', fill)

		svg.append('text')
			.attr('x', x + 5)
			.attr('y', y + 5)
			.attr('fill', 'black')
			.attr('text-anchor', 'start')
			.attr('dominant-baseline', 'hanging')
			.text(date)

		svg.append('text')
			.attr('x', x + width - 5)
			.attr('y', y + 5)
			.attr('fill', 'black')
			.attr('text-anchor', 'end')
			.attr('dominant-baseline', 'hanging')
			.text(data.title)

		svg.append('text')
			.attr('x', x + 5)
			.attr('y', y + height - 5)
			.attr('fill', 'black')
			.attr('text-anchor', 'start')
			.attr('dominant-baseline', 'auto')
			.text(time)

	}, [date, time, data.title, x, y, width, height, fill])

	return (
		<g ref={svgRef}/>
	)
}

export default DateItem