/**
 * Компонент фона рабочей области
 *
 * @author Markitanov Vadim
 * @since 22.11.2023
 */
import React, { JSX, LegacyRef, useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { BOARD_ITEM_HEIGHT, BOARD_ITEM_WIDTH, DATE_ITEM_WIDTH } from '../../utils/consts'
import { useStore } from 'effector-react'
import { $flights, boardSelectResetFx } from '../../store/flight'
import { $dates } from '../../store/date'
import { $style } from '../../store/style'
import { flightSelectReset } from '../../store/route'

const Background = (): JSX.Element => {
	const style = useStore($style)
	const dates = useStore($dates)
	const boards = useStore($flights)
	const gRef: LegacyRef<SVGGElement> = useRef<SVGGElement>(null)
	const x = BOARD_ITEM_WIDTH
	const y = 0
	const width = DATE_ITEM_WIDTH * dates.length
	const height = BOARD_ITEM_HEIGHT * boards.length

	useEffect(() => {
		const svg = d3.select(gRef.current)
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
					.attr('stroke', style.lineColor)
					.attr('stroke-dasharray', [2, 3])
					.attr('fill', style.backgroundColor)
			}
		}

		container.on('click', function (_: PointerEvent) {
			boardSelectResetFx()
			flightSelectReset()
		})

	}, [style, x, y, width, height, boards, dates])

	return (
		<g ref={gRef}></g>
	)
}

export default Background
