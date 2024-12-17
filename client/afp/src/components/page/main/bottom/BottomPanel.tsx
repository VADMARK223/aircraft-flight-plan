/**
 * Компонент монитора плана воздушных судов.
 *
 * @author Markitanov Vadim
 * @since 25.10.2024
 */
import { JSX, useEffect, useRef, useState } from 'react'
import InfoPanel from './InfoPanel'
import Header from './Header'
import {
  CELL_HEIGHT,
  FLIGHT_CELL_WIDTH,
  DATE_ITEM_HEIGHT,
  DATE_ITEM_WIDTH,
  HEADER_HEIGHT
} from '../../../../utils/consts'
import { useStore } from 'effector-react'
import { $dates } from '../../../../store/date'
import DatesPanel from './DatesPanel'
import Flights from './Flights'
import { $flights } from '../../../../store/flight'
import Routes from './Routes'
import Background from './Background'

const BottomPanel = (): JSX.Element => {
  const dates = useStore($dates)
  const boards = useStore($flights)
  const bottomSvgContainerRef = useRef<any>(null)
  const [bottomSvgContainerHeight, setBottomSvgContainerHeight] = useState('100px')

  useEffect(() => {
    const updateContainerHeight = () => {
      const screenHeight = window.innerHeight

      if (bottomSvgContainerRef.current) {
        const bottomSvgContainerTop = bottomSvgContainerRef.current.getBoundingClientRect().top
        const newContainerHeight = screenHeight - bottomSvgContainerTop - 13 + 'px'
        setBottomSvgContainerHeight(newContainerHeight)
      }
    }
    updateContainerHeight()
    window.addEventListener('resize', updateContainerHeight)
    return () => {
      window.removeEventListener('resize', updateContainerHeight)
    }
  }, [])

  return (
    <>
      <svg id={'viewer-top'} width={FLIGHT_CELL_WIDTH + DATE_ITEM_WIDTH * dates.length}
           height={HEADER_HEIGHT + DATE_ITEM_HEIGHT}>
        <rect width={'100%'} height={'100%'} fill={'gray'}/>
        <InfoPanel x={0} y={0}/>
        <Header x={FLIGHT_CELL_WIDTH} y={0}/>
        <DatesPanel x={FLIGHT_CELL_WIDTH} y={HEADER_HEIGHT}/>
      </svg>
      <div
        ref={bottomSvgContainerRef}
        style={{
          width: FLIGHT_CELL_WIDTH + DATE_ITEM_WIDTH * dates.length + 35,
          height: bottomSvgContainerHeight,
          overflowY: 'auto',
        }}
      >
        <svg id={'viewer-bottom'}
             width={FLIGHT_CELL_WIDTH + DATE_ITEM_WIDTH * dates.length}
             height={boards.length * CELL_HEIGHT}
        >
          <Flights x={0} y={0}/>
          <Background x={FLIGHT_CELL_WIDTH} y={0}/>
          <Routes x={FLIGHT_CELL_WIDTH} y={0}/>
        </svg>
      </div>
    </>
  )
}

export default BottomPanel