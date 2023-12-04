/**
 * Компонент фона рабочей области
 *
 * @author Markitanov Vadim
 * @since 22.11.2023
 */
import React, { JSX, LegacyRef, useEffect, useRef } from 'react'
import * as d3 from 'd3'
import {
	BOARD_ITEM_HEIGHT,
	BOARD_ITEM_WIDTH,
	DATE_ITEM_HEIGHT,
	DATE_ITEM_WIDTH,
	HEADER_HEIGHT
} from '../utils/consts'
import { useStore } from 'effector-react'
import { $boards } from '../store/board'
import { $dates } from '../store/date'

const Background = (): JSX.Element => {
	const dates = useStore($dates)
	const boards = useStore($boards)
	const svgRef: LegacyRef<any> = useRef<SVGSVGElement | undefined>()
	const x = BOARD_ITEM_WIDTH
	const y = HEADER_HEIGHT + DATE_ITEM_HEIGHT
	const width = DATE_ITEM_WIDTH * dates.length
	const height = BOARD_ITEM_HEIGHT * boards.length
	const fill = 'white'

	useEffect(() => {
		const svg = d3.select(svgRef.current)
		svg.selectAll('*').remove()
		const container = svg.append('g')
		container.attr('transform', `translate(${x},${y})`)
		for (let j = 0; j < boards.length; j++) {
			for (let i = 0; i < dates.length; i++) {
				container.append('rect')
					.attr('x', DATE_ITEM_WIDTH * i)
					.attr('y', BOARD_ITEM_HEIGHT * j)
					.attr('width', DATE_ITEM_WIDTH)
					.attr('height', BOARD_ITEM_HEIGHT)
					.attr('stroke', 'black')
					.attr('stroke-dasharray', [2, 3])
					.attr('fill', fill)
			}
		}

	}, [x, y, width, height, boards])

	return (
		<svg ref={svgRef}></svg>
	)
}

export default Background