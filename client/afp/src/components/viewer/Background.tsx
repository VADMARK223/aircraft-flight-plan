/**
 * Компонент
 *
 * @author Markitanov Vadim
 * @since 03.11.2024
 */
import React, { JSX, LegacyRef, useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { BOARD_ITEM_HEIGHT, BOARD_ITEM_WIDTH, DATE_ITEM_WIDTH } from '../../utils/consts'
import { $boards, boardSelectResetFx } from '../../store/board'
import { flightSelectReset } from '../../store/flight'
import { useStore } from 'effector-react'
import { $dates } from '../../store/date'
import { $style } from '../../store/style'
import { CommonProps } from '../common/CommonProps'

const Background = ({x,y}:CommonProps): JSX.Element => {
  const svgRef: LegacyRef<SVGGElement> = useRef<SVGGElement>(null)
  const dates = useStore($dates)
  const boards = useStore($boards)
  const width = DATE_ITEM_WIDTH * dates.length
  const height = BOARD_ITEM_HEIGHT * boards.length
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
    <g ref={svgRef} id={'background'}></g>
  )
}

export default Background