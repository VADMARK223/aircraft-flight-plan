/**
 * Компонент фона полётов.
 *
 * @author Markitanov Vadim
 * @since 11.12.2023
 */
import React, { JSX, LegacyRef, useEffect, useRef } from 'react'
import { useStore } from 'effector-react'
import { $style } from '../../store/style'
import { $dates } from '../../store/date'
import { $flights, flightSelectResetFx } from '../../store/flight'
import { CELL_HEIGHT, DATE_ITEM_WIDTH } from '../../utils/consts'
import * as d3 from 'd3'
import { routeSelectReset } from '../../store/route'

const BackgroundSvg = (): JSX.Element => {
	const style = useStore($style)
	const dates = useStore($dates)
	const boards = useStore($flights)
	const gRef: LegacyRef<SVGGElement> = useRef<SVGGElement>(null)
	const width = DATE_ITEM_WIDTH * dates.length
	const height = CELL_HEIGHT * boards.length

	useEffect(() => {
		const svg = d3.select(gRef.current)
		svg.selectAll('*').remove()
		const container = svg.append('g')
		for (let j = 0; j < boards.length; j++) {
			for (let i = 0; i < dates.length; i++) {
				container.append('rect')
					.attr('x', DATE_ITEM_WIDTH * i)
					.attr('y', CELL_HEIGHT * j)
					.attr('width', DATE_ITEM_WIDTH)
					.attr('height', CELL_HEIGHT)
					.attr('stroke', style.lineColor)
					.attr('stroke-dasharray', [2, 3])
					.attr('fill', style.backgroundColor)
			}
		}

		container.on('click', function () {
			flightSelectResetFx()
			routeSelectReset()
		})

	}, [style, width, height, boards, dates])

	return (
		<g ref={gRef}></g>
	)
}

export default BackgroundSvg
