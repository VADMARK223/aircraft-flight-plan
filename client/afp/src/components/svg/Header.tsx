/**
 * Компонент заголовка.
 *
 * @author Markitanov Vadim
 * @since 20.12.2023
 */
import React, { JSX, LegacyRef, useEffect, useRef } from 'react'
import { useStore } from 'effector-react'
import { $style } from '../../store/style'
import { $dates } from '../../store/date'
import { DATE_ITEM_WIDTH, HEADER_HEIGHT } from '../../utils/consts'
import * as d3 from 'd3'
import { $ui } from '../../store/ui'
import { $flights } from '../../store/board'

const Header = (): JSX.Element => {
	const style = useStore($style)
	const dates = useStore($dates)
	const boards = useStore($flights)
	const ui = useStore($ui)
	const gRef: LegacyRef<any> = useRef<SVGGElement>(null)
	const width = DATE_ITEM_WIDTH * dates.length
	const height = HEADER_HEIGHT

	useEffect(() => {
		const svg = d3.select(gRef.current)

		svg.append('rect')
			.attr('width', width)
			.attr('height', height)
			.attr('stroke', style.lineColor)
			.attr('fill', style.backgroundColor)
		const text = svg.append('text')
			.attr('x', 5)
			.attr('fill', style.textColor)
			.attr('text-anchor', 'start')
			.attr('dominant-baseline', 'hanging')
			.attr('font-weight', 'bold')
			.attr('font-size', 18)
			.attr('transform', `translate(${ui.x},${0})`)
			.text(`ПЛАН ПОЛЕТОВ ВОЗДУШНЫХ СУДОВ (Бортов: ${boards.length})`)

		const textBox: SVGRect | undefined = text.node()?.getBBox()
		if (textBox) {
			text.attr('y', (HEADER_HEIGHT - textBox?.height) * 0.5 + 4)
		}
	}, [ui.x, boards.length, style, width, height])

	return (
		<g ref={gRef}></g>
	)
}

export default Header
