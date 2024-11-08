/**
 * Компонент панели с датами.
 *
 * @author Markitanov Vadim
 * @since 25.10.2024
 */
import React, { JSX, useRef } from 'react'
import { useStore } from 'effector-react'
import { DATE_ITEM_HEIGHT, DATE_ITEM_WIDTH } from '../../utils/consts'
import { CommonProps } from '../common/CommonProps'
import { $dates } from '../../store/date'
import DateItem from './DateItem'

const DatesPanel = ({ x, y }: CommonProps): JSX.Element => {
  const svgRef = useRef<SVGSVGElement>(null)
  const dates = useStore($dates)
  const width = DATE_ITEM_WIDTH * dates.length

  return (
    <g transform={`translate(${x},${y})`}>
      <svg id={'dates'}
           ref={svgRef}
           width={width}
           height={DATE_ITEM_HEIGHT}
      >
        {dates.map((value, index) => (
          <DateItem key={index}
                    data={value}
                    x={DATE_ITEM_WIDTH * index}
                    y={0}/>))}
      </svg>
    </g>

  )
}

export default DatesPanel