/**
 * Компонент фона рабочей области.
 *
 * @author Markitanov Vadim
 * @since 03.11.2024
 */
import React, { JSX, LegacyRef, useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { CELL_HEIGHT, DATE_ITEM_WIDTH } from '../../../../utils/consts'
import { $flights, flightSelectResetFx, flightsSelectReset } from '../../../../store/flight'
import { useStore } from 'effector-react'
import { $style } from '../../../../store/style'
import { CommonProps } from '../../../common/CommonProps'
import { routeSelectReset } from '../../../../store/route'
import { $canvas } from '../../../../store/canvas'

const Background = ({x,y}:CommonProps): JSX.Element => {
  const svgRef: LegacyRef<SVGGElement> = useRef<SVGGElement>(null)
  const dates = useStore($canvas).dates
  const boards = useStore($flights)
  const width = DATE_ITEM_WIDTH * dates.length
  const height = CELL_HEIGHT * boards.length
  const style = useStore($style)

  useEffect(() => {
    const svgElement = svgRef.current
    if (!svgElement) {
      return
    }
    const svg = d3.select(svgElement)

    const container = svg.append('g')
    container.attr('transform', `translate(${x},${y})`)
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
      flightSelectResetFx() // Deprecated
      flightsSelectReset() // Сброс выбранных рейсов
      routeSelectReset()
    })

  }, [style, x, y, width, height, boards, dates.length])

  return (
    <g ref={svgRef} id={'background'}></g>
  )
}

export default Background
