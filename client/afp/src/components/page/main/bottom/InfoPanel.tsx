/**
 * Компонент информационной панели.
 *
 * @author Markitanov Vadim
 * @since 25.10.2024
 */
import React, { JSX, useEffect, useRef } from 'react'
import { useStore } from 'effector-react'
import { $style } from '../../../../store/style'
import { FLIGHT_CELL_WIDTH, DATE_ITEM_HEIGHT, FULL_TIME_FORMAT, HEADER_HEIGHT } from '../../../../utils/consts'
import dayjs from 'dayjs'
import * as d3 from 'd3'
import { getWeekCount } from '../../../../utils/utils'
import { CommonProps } from '../../../common/CommonProps'

const InfoPanel = ({x,y}:CommonProps): JSX.Element => {
  const style = useStore($style)
  const svgRef = useRef<SVGSVGElement>(null)
  const width = FLIGHT_CELL_WIDTH
  const height = DATE_ITEM_HEIGHT + HEADER_HEIGHT
  const now = dayjs()

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
      .text(`Week ${getWeekCount(now)}`)
  }, [style, width, height, now])

  return (
    <g transform={`translate(${x},${y})`}>
      <svg id={'info-panel'}
           ref={svgRef}
           width={width} // 140
           height={height} // 75
        // viewBox={'20 20 40 75'}
        // preserveAspectRatio={'xMinYMin meet'} // Центрирование содержимого с сохранением пропорций
      />
    </g>
  )
}

export default InfoPanel
