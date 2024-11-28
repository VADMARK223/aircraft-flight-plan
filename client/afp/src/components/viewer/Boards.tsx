/**
 * Компонент
 *
 * @author Markitanov Vadim
 * @since 03.11.2024
 */
import React, { JSX } from 'react'
import { useStore } from 'effector-react'
import { BOARD_ITEM_HEIGHT, BOARD_ITEM_WIDTH } from '../../utils/consts'
import { CommonProps } from '../common/CommonProps'
import FlightItem from '../common/flights/FlightItem'
import ContextMenu from '../common/ContextMenu'
import { Flight } from '../../models/Flight'
import { Board } from '../../models/Board'
import { $boards, boardClickFx, boardDeleteFx } from '../../store/board'
import { $contextMenu } from '../../store/contextMenu'

const Boards = ({ x, y }: CommonProps): JSX.Element => {
  const boards = useStore($boards)
  const contextMenu = useStore($contextMenu)

  return (
    <g id={'boards'} transform={`translate(${x}, ${y})`}>
      {boards.map((value, index) => (
        <FlightItem key={value.id}
                   data={value}
                   x={0}
                   y={BOARD_ITEM_HEIGHT * index}
                   width={BOARD_ITEM_WIDTH}
                   height={BOARD_ITEM_HEIGHT}/>))}

      <g id={'context-menu-layout'}>
        {contextMenu && !contextMenu.isFlight && <ContextMenu menuItems={[
          {
            title: 'Редактировать',
            action: (datum: Flight | Board) => {
              boardClickFx(datum as Board)
            }
          }, {
            title: 'Удалить',
            action: (datum: Flight | Board) => {
              boardDeleteFx(datum as Board)
            }
          }
        ]}/>}
      </g>
    </g>

  )
}

export default Boards
