import React from 'react'
import {
	BOARD_ITEM_HEIGHT,
	BOARD_ITEM_WIDTH,
	DATE_ITEM_HEIGHT,
	DATE_ITEM_WIDTH,
	dates,
	HEADER_HEIGHT
} from './utils/consts'
import DateItem from './components/DateItem'
import BoardItem from './components/BoardItem'
import Background from './components/Background'
import InfoPanel from './components/InfoPanel'
import Header from './components/Header'
import Border from './components/Border'
import { useStore } from 'effector-react'
import { Space } from 'antd'
import ControlPanel from './components/controlPanel/ControlPanel'
import Flights from './components/Flights'
import { $boards } from './store/board'

function App () {
	const boards = useStore($boards)

	// useEffect(() => {
	//     fetchBoardsFx()
	// }, []);

	return (
		<Space direction={'vertical'}>
			<ControlPanel/>
			<svg width={1730}
				 height={750}
				 style={{ backgroundColor: 'white' }}
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

export default App
