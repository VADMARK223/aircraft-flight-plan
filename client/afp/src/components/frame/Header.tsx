/**
 * Компонент заголовка
 *
 * @author Markitanov Vadim
 * @since 23.11.2023
 */
import React, { JSX, LegacyRef, useEffect, useRef } from 'react'
import { BOARD_ITEM_WIDTH, DATE_ITEM_WIDTH, HEADER_HEIGHT } from '../../utils/consts'
import * as d3 from 'd3'
import { useStore } from 'effector-react'
import { $dates } from '../../store/date'
import { $style } from '../../store/style'

const Header = (): JSX.Element => {
	const style = useStore($style)
	const dates = useStore($dates)
	const svgRef: LegacyRef<any> = useRef<SVGSVGElement | undefined>()
	const x = BOARD_ITEM_WIDTH
	const y = 0
	const width = DATE_ITEM_WIDTH * dates.length
	const height = HEADER_HEIGHT

	useEffect(() => {
		const svg = d3.select(svgRef.current)

		svg.append('rect')
			.attr('x', x)
			.attr('y', y)
			.attr('width', width)
			.attr('height', height)
			.attr('stroke', style.lineColor)
			.attr('fill', style.backgroundColor)
		svg.append('text')
			.attr('x', x + 5)
			.attr('y', y + 7)
			.attr('fill', style.textColor)
			.attr('text-anchor', 'start')
			.attr('dominant-baseline', 'hanging')
			.attr('font-weight', 'bold')
			.attr('font-size', 18)
			.text('ПЛАН ПОЛЕТОВ ВОЗДУШНЫХ СУДОВ')
	}, [style, x, y, width, height])

	return (
		<svg ref={svgRef}></svg>
	)
}

export default Header