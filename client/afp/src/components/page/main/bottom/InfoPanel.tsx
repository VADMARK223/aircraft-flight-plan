/**
 * Компонент информационной панели.
 *
 * @author Markitanov Vadim
 * @since 25.10.2024
 */
import React, { JSX, useEffect, useRef } from 'react'
import { useStore } from 'effector-react'
import { $style } from '../../../../store/style'
import { FLIGHT_CELL_WIDTH, DATE_ITEM_HEIGHT, FULL_TIME_FORMAT } from '../../../../utils/consts'
import dayjs from 'dayjs'
import * as d3 from 'd3'
import { CommonProps } from '../../../common/CommonProps'
import { getWeekCount } from '../../../../utils/utils'

const InfoPanel = ({ x, y }: CommonProps): JSX.Element => {
	const style = useStore($style)
	const svgRef = useRef<SVGSVGElement>(null)
	// const height =
	const now = dayjs()

	useEffect(() => {
		const svgElement = svgRef.current
		if (!svgElement) {
			return
		}
		const svg = d3.select(svgElement)

		svg.append('rect')
			.attr('width', FLIGHT_CELL_WIDTH)
			.attr('height', DATE_ITEM_HEIGHT)
			.attr('stroke', style.lineColor)
			.attr('fill', style.backgroundColor)
		svg.append('text')
			.attr('x', FLIGHT_CELL_WIDTH * 0.5)
			.attr('y', 5)
			.attr('fill', style.textColor)
			.attr('text-anchor', 'middle')
			.attr('dominant-baseline', 'hanging')
			.text(now.format(FULL_TIME_FORMAT))

		svg.append('text')
			.attr('x', FLIGHT_CELL_WIDTH * 0.5)
			.attr('y', DATE_ITEM_HEIGHT - 5)
			.attr('fill', style.textColor)
			.attr('text-anchor', 'middle')
			.attr('dominant-baseline', 'baseline')
			.text(`Week ${getWeekCount(now)}`)
	}, [style, now])

	return (
		<g transform={`translate(${x},${y})`}>
			<svg id={'info-panel'}
				 ref={svgRef}
				 width={FLIGHT_CELL_WIDTH} // 140
				 height={DATE_ITEM_HEIGHT} // 75
			/>
		</g>
	)
}

export default InfoPanel
