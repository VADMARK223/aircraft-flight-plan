/**
 * Компонент заголовка монитора.
 *
 * @author Markitanov Vadim
 * @since 25.10.2024
 */
import React, { JSX, useEffect, useRef } from 'react'
import { useStore } from 'effector-react'
import { $style } from '../../store/style'
import { DATE_ITEM_WIDTH, HEADER_HEIGHT } from '../../utils/consts'
import * as d3 from 'd3'
import { CommonProps } from '../common/CommonProps'
import { $dates } from '../../store/date'

const Header = ({ x, y }: CommonProps): JSX.Element => {
  const style = useStore($style)
  const svgRef = useRef<SVGSVGElement>(null)
  const dates = useStore($dates)
  const width = DATE_ITEM_WIDTH * dates.length
  const height = HEADER_HEIGHT

  useEffect(() => {
    const svgElement = svgRef.current
    if (!svgElement) {
      return
    }
    const svg = d3.select(svgElement)

    svg.append('rect')
      .attr('width', width)
      .attr('height', height)
      .attr('stroke', style.lineColor)
      .attr('fill', style.backgroundColor)
    svg.append('text')
      .attr('transform', 'translate(5,7)')
      .attr('fill', style.textColor)
      .attr('text-anchor', 'start')
      .attr('dominant-baseline', 'hanging')
      .attr('font-weight', 'bold')
      .attr('font-size', 18)
      .text('ПЛАН ПОЛЕТОВ ВОЗДУШНЫХ СУДОВ')

  }, [style, width, height])

  return (
    <g transform={`translate(${x},${y})`}>
      <svg id={'header'}
           ref={svgRef}
           width={width}
           height={height}
      />
    </g>

  )
}

export default Header