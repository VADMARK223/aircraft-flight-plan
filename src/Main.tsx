/**
 * Компонент
 *
 * @author Markitanov Vadim
 * @since 06.12.2023
 */
import React, { JSX, useEffect, useState } from 'react'
import ControlPanel from './components/controlPanel/ControlPanel'
import InfoPanel from './components/InfoPanel'
import Header from './components/Header'
import BoardItem from './components/BoardItem'
import { BOARD_ITEM_HEIGHT, BOARD_ITEM_WIDTH, DATE_ITEM_HEIGHT, DATE_ITEM_WIDTH, HEADER_HEIGHT } from './utils/consts'
import DateItem from './components/DateItem'
import Background from './components/Background'
import Flights from './components/Flights'
import Border from './components/Border'
import { Space } from 'antd'
import { useStore } from 'effector-react'
import { $dates } from './store/date'
import { $boards } from './store/board'

const Main = (): JSX.Element => {
	const dates = useStore($dates)
	const boards = useStore($boards)
	const [canvasHeight, setCanvasHeight] = useState(HEADER_HEIGHT + DATE_ITEM_HEIGHT + boards.length * BOARD_ITEM_HEIGHT)

	useEffect(() => {
		setCanvasHeight(HEADER_HEIGHT + DATE_ITEM_HEIGHT + boards.length * BOARD_ITEM_HEIGHT)
	}, [boards])
	const canvasWidth = dates.length * DATE_ITEM_WIDTH + BOARD_ITEM_WIDTH

	return (
		<Space direction={'vertical'}>
			<ControlPanel/>
			<svg width={canvasWidth}
				 height={canvasHeight + 1}
				 style={{ backgroundColor: '$backgroundColor' }}
			>
				<InfoPanel/>
				<Header/>
				{boards.map((value, index) => (
					<BoardItem key={value.id}
							   data={value}
							   x={0}
							   y={HEADER_HEIGHT + DATE_ITEM_HEIGHT + BOARD_ITEM_HEIGHT * index}
							   width={BOARD_ITEM_WIDTH}
							   height={BOARD_ITEM_HEIGHT}/>))}
				{dates.map((value, index) => (
					<DateItem key={index}
							  data={value}
							  x={BOARD_ITEM_WIDTH + DATE_ITEM_WIDTH * index}
							  y={HEADER_HEIGHT}/>))}
				<Background/>
				<Flights/>
				<Border/>
			</svg>
		</Space>
	)
}

export default Main