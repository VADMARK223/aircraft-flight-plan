/**
 * Компонент
 *
 * @author Markitanov Vadim
 * @since 22.11.2023
 */
import { JSX, LegacyRef, useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { BOARD_ITEM_WIDTH } from '../utils/consts'
import { Board } from '../models/Board'

interface BoardItemProps {
	data: Board
	x: number
	y: number
	width: number
	height: number
	fill?: string
}

const BoardItem = (props: BoardItemProps): JSX.Element => {
	const { data, x, y, width, height, fill = 'white' } = props
	const svgRef: LegacyRef<any> = useRef<SVGSVGElement | undefined>()

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
			.attr('fill', data.type ? data.type : 'black')
			.attr('font-weight', 'bold')
			.attr('text-anchor', 'start')
			.attr('dominant-baseline', 'hanging')
			.text(data.name)

		const lineShiftX = 5
		const lineShiftY = 25
		svg.append('line')
			.attr('stroke', 'black')
			.attr('stroke-width', 1)
			.attr('x1', x + lineShiftX)
			.attr('y1', y + lineShiftY)
			.attr('x2', x + BOARD_ITEM_WIDTH - 2 * lineShiftX)
			.attr('y2', y + lineShiftY)

		svg.append('text')
			.attr('x', x + 5)
			.attr('y', y + 33)
			.attr('fill', 'black')
			.attr('text-anchor', 'start')
			.attr('dominant-baseline', 'hanging')
			.text(data.flights.length ? `Полетов: ${data.flights.length}` : 'Нет полетов')

	}, [data.name, x, y, width, height, fill, data.type, data.flights.length])

	return (
		<g ref={svgRef}/>
	)
}

export default BoardItem