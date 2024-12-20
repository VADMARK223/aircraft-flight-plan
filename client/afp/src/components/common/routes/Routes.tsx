/**
 * Компонент отображения полетов.
 *
 * @author Markitanov Vadim
 * @since 11.12.2023
 */
import React, { JSX, LegacyRef, useEffect, useRef } from 'react'
import { useStore } from 'effector-react'
import { $dates, $datesRange } from '../../../store/date'
import { Flight } from '../../../models/Flight'
import { $flights } from '../../../store/flight'
import { $contextMenu } from '../../../store/contextMenu'
import * as d3 from 'd3'
import { CELL_HEIGHT, FLIGHT_CELL_WIDTH, DATE_ITEM_WIDTH } from '../../../utils/consts'
import { Route } from '../../../models/Route'
import RouteItem from './RouteItem'
import ContextMenu from '../ContextMenu'
import { $test } from '../../../store/test'
import { routeClickFx, routeDeleteFx } from '../../../store/route'

const Routes = (): JSX.Element => {
  const gRef: LegacyRef<SVGGElement> = useRef<SVGGElement>(null)
  const datesRange = useStore($datesRange)
  const boards: Flight[] = useStore($flights)
  const dates = useStore($dates)
  const contextMenu = useStore($contextMenu)
  const test = useStore($test)

  useEffect(() => {
    if (!test) {
      const container = d3.select(gRef.current)
      container.attr('transform', `translate(${FLIGHT_CELL_WIDTH},${0})`)
    }
  }, [test])

  return (
    <g ref={gRef} id={'flights-layout'}>
      {boards.map((board: Flight, boardIndex) =>
        (
          <g key={board.id} id={`board-row-${board.id}`}>
            {board.routes.map((flight: Route) => {
                if (!datesRange || !datesRange.every(date => date)) {
                  return
                }

                if(datesRange[0] == null || datesRange[1] == null) {
                  return
                }

                const startDate = datesRange[0].toDate()
                const endDate = datesRange[1].add(1, 'day').toDate()
                const rangeEnd = DATE_ITEM_WIDTH * dates.length
                const scaleTime = d3.scaleTime([startDate, endDate], [0, rangeEnd])
                let startX = scaleTime(flight.scheduledDepartureDate.toDate())
                const endX = scaleTime(flight.scheduledArrivalDate.toDate())
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
                    y={CELL_HEIGHT * boardIndex}
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
              routeClickFx(datum as Route)
            }
          }, {
            title: 'Удалить',
            action: (datum: Route | Flight) => {
              routeDeleteFx(datum as Route)
            }
          }
        ]}/>}
      </g>
    </g>
  )
}

export default Routes
