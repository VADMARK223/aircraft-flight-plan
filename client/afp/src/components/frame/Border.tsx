/**
 * Компонент
 *
 * @author Markitanov Vadim
 * @since 23.11.2023
 */
import React, { JSX, LegacyRef, useEffect, useRef } from 'react'
import { BOARD_ITEM_HEIGHT, BOARD_ITEM_WIDTH, DATE_ITEM_WIDTH} from '../../utils/consts'
import * as d3 from 'd3'
import { useStore } from 'effector-react'
import { drawLine } from '../../utils/utils'
import { $flights } from '../../store/flight'
import { $dates } from '../../store/date'
import { $style } from '../../store/style'

const Border = (): JSX.Element => {
	const style = useStore($style)
	const dates = useStore($dates)
	const boards = useStore($flights)
	const svgRef: LegacyRef<any> = useRef<SVGSVGElement | undefined>()
	const x = BOARD_ITEM_WIDTH
	const y = 0
	const width = DATE_ITEM_WIDTH * dates.length + BOARD_ITEM_WIDTH
	const height = BOARD_ITEM_HEIGHT * boards.length

	useEffect(() => {
		const svg = d3.select(svgRef.current)
		svg.selectAll('*').remove()
		drawLine(svg, style.lineColor, x, y, width, y)
		drawLine(svg, style.lineColor, width, y, width, height)
		drawLine(svg, style.lineColor, width, height, x, height)
		drawLine(svg, style.lineColor, x, height, x, y)

	}, [style,x, y, width, height])

	return (
		<svg ref={svgRef}></svg>
	)
}

export default Border
