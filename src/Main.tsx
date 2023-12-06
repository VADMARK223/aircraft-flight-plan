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
	const [topCanvasHeight, setTopCanvasHeight] = useState(HEADER_HEIGHT + DATE_ITEM_HEIGHT)
	const [bottomCanvasHeight, setBottomCanvasHeight] = useState(boards.length * BOARD_ITEM_HEIGHT)

	useEffect(() => {
		setTopCanvasHeight(HEADER_HEIGHT + DATE_ITEM_HEIGHT)
		setBottomCanvasHeight(boards.length * BOARD_ITEM_HEIGHT)
	}, [boards])
	const canvasWidth = dates.length * DATE_ITEM_WIDTH + BOARD_ITEM_WIDTH

	return (
		<Space direction={'vertical'} size={'small'}>
			<ControlPanel/>
			<div style={{ padding: 0, margin: 0 }}>
				<svg width={canvasWidth}
					 height={topCanvasHeight + 1}
					 style={{ backgroundColor: '$backgroundColor', padding: 0, margin: 0 }}
				>
					<InfoPanel/>
					<Header/>
					{dates.map((value, index) => (
						<DateItem key={index}
								  data={value}
								  x={BOARD_ITEM_WIDTH + DATE_ITEM_WIDTH * index}
								  y={HEADER_HEIGHT}/>))}
				</svg>
				<svg width={canvasWidth}
					 height={bottomCanvasHeight + 1}
					 style={{ backgroundColor: '$backgroundColor', padding: 0, margin: 0 }}
				>
					{boards.map((value, index) => (
						<BoardItem key={value.id}
								   data={value}
								   x={0}
								   y={BOARD_ITEM_HEIGHT * index}
								   width={BOARD_ITEM_WIDTH}
								   height={BOARD_ITEM_HEIGHT}/>))}
					<Background/>
					<Flights/>
					<Border/>
				</svg>
			</div>
		</Space>
	)
}

export default Main