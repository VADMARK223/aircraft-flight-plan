/**
 * Компонент
 *
 * @author Markitanov Vadim
 * @since 03.11.2024
 */
import React, { JSX, LegacyRef, useRef } from 'react'
import { Flight } from '../../models/Flight'
import { Route } from '../../models/Route'
import { BOARD_ITEM_HEIGHT, DATE_ITEM_WIDTH } from '../../utils/consts'
import * as d3 from 'd3'
import RouteItem from '../common/routes/RouteItem'
import ContextMenu from '../common/ContextMenu'
import { flightClickFx, flightDeleteFx } from '../../store/route'
import { useStore } from 'effector-react'
import { $contextMenu } from '../../store/contextMenu'
import { $flights } from '../../store/flight'
import { $dates, $datesRange } from '../../store/date'
import { CommonProps } from '../common/CommonProps'

const Flights = ({x,y}:CommonProps): JSX.Element => {
  const gRef: LegacyRef<SVGGElement> = useRef<SVGGElement>(null)
  const contextMenu = useStore($contextMenu)
  const boards: Flight[] = useStore($flights)
  const dates = useStore($dates)
  const datesRange = useStore($datesRange)

  return (
    <g ref={gRef} id={'flights'} transform={`translate(${x}, ${y})`}>
      {boards.map((board: Flight, boardIndex) =>
        (
          <g key={board.id} id={`board-row-${board.id}`}>
            {board.routes.map((flight: Route) => {
                if (!datesRange || !datesRange.every(date => date)) {
                  return undefined
                }

                // @ts-ignore
                const startDate = datesRange[0].toDate()
                // @ts-ignore
                const endDate = datesRange[1].add(1, 'day').toDate()
                const rangeEnd = DATE_ITEM_WIDTH * dates.length
                const scaleTime = d3.scaleTime([startDate, endDate], [0, rangeEnd])
                let startX = scaleTime(flight.startDate.toDate())
                const endX = scaleTime(flight.endDate.toDate())
                let w = endX - startX

                if (endX <= 0 || startX >= rangeEnd) {
                  return undefined
                }

                if (startX <= 0) {
                  startX = 0
                  w = endX
                }

                return (
                  <RouteItem
                    key={flight.id}
                    x={startX}
                    y={BOARD_ITEM_HEIGHT * boardIndex}
                    width={w}
                    data={flight}
                  />)
              }
            )
            }
          </g>
        )
      )}
      <g id={'context-menu-layout'}>
        {contextMenu && contextMenu.isFlight && <ContextMenu menuItems={[
          {
            title: 'Редактировать',
            action: (datum: Route | Flight) => {
              flightClickFx(datum as Route)
            }
          }, {
            title: 'Удалить',
            action: (datum: Route | Flight) => {
              flightDeleteFx(datum as Route)
            }
          }
        ]}/>}
      </g>
    </g>
  )
}

export default Flights
