/**
 * Компонент информационной панели
 *
 * @author Markitanov Vadim
 * @since 22.11.2023
 */
import React, { JSX, LegacyRef, useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { BOARD_ITEM_WIDTH, DATE_ITEM_HEIGHT, FULL_TIME_FORMAT, HEADER_HEIGHT } from '../../utils/consts'
import dayjs from 'dayjs'
import { getWeekCount } from '../../utils/utils'
import { useStore } from 'effector-react'
import { $style } from '../../store/style'

const InfoPanel = (): JSX.Element => {
	const style = useStore($style)
	const svgRef: LegacyRef<any> = useRef<SVGSVGElement | undefined>()
	const width = BOARD_ITEM_WIDTH
	const height = DATE_ITEM_HEIGHT + HEADER_HEIGHT
	const now = dayjs()

	useEffect(() => {
		const svg = d3.select(svgRef.current)

		svg.append('rect')
			.attr('width', width)
			.attr('height', height)
			.attr('stroke', style.lineColor)
			.attr('fill', style.backgroundColor)
		svg.append('text')
			.attr('x', width * 0.5)
			.attr('y', height * 0.5)
			.attr('fill', style.textColor)
			.attr('text-anchor', 'middle')
			.attr('dominant-baseline', 'middle')
			.text(now.format(FULL_TIME_FORMAT))
		svg.append('text')
			.attr('x', width * 0.5)
			.attr('y', height - 8)
			.attr('fill', style.textColor)
			.attr('text-anchor', 'middle')
			.attr('dominant-baseline', 'auto')
			.attr('font-size', 14)
			.text(`Неделя ${getWeekCount(now)}`)
	}, [style, width, height, now])

	return (
		<svg ref={svgRef}></svg>
	)
}

export default InfoPanel