/**
 * Компонент
 *
 * @author Markitanov Vadim
 * @since 06.12.2023
 */
import React, { JSX, useEffect, useRef, useState } from 'react'
import ControlPanel from './components/controlPanel/ControlPanel'
import InfoPanel from './components/InfoPanel'
import Header from './components/Header'
import BoardItem from './components/BoardItem'
import { BOARD_ITEM_HEIGHT, BOARD_ITEM_WIDTH, DATE_ITEM_HEIGHT, DATE_ITEM_WIDTH, HEADER_HEIGHT } from './utils/consts'
import DateItem from './components/DateItem'
import Background from './components/Background'
import Flights from './components/flights/Flights'
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
	const bottomSvgContainerRef = useRef<any>(null)
	const [bottomSvgContainerHeight, setBottomSvgContainerHeight] = useState('100px')
	const canvasWidth = dates.length * DATE_ITEM_WIDTH + BOARD_ITEM_WIDTH

	useEffect(() => {
		const updateContainerHeight = () => {
			const screenHeight = window.innerHeight

			if (bottomSvgContainerRef.current) {
				// const isScrollVisible = document.documentElement.scrollWidth > window.innerWidth
				// const temp = window.innerHeight - document.documentElement.scrollHeight
				// console.log('document.documentElement.scrollWidth', temp)
				// console.log('isScrollVisible', isScrollVisible)
				const bottomSvgContainerTop = bottomSvgContainerRef.current.getBoundingClientRect().top
				const newContainerHeight = screenHeight - bottomSvgContainerTop - 20 + 'px'
				setBottomSvgContainerHeight(newContainerHeight)
			}
		}
		updateContainerHeight()
		window.addEventListener('resize', updateContainerHeight)
		return () => {
			window.removeEventListener('resize', updateContainerHeight)
		}
	}, [])

	useEffect(() => {
		setTopCanvasHeight(HEADER_HEIGHT + DATE_ITEM_HEIGHT)
		setBottomCanvasHeight(boards.length * BOARD_ITEM_HEIGHT)
	}, [boards])

	return (
		<Space direction={'vertical'} size={'small'}>
			<ControlPanel/>
			<div>
				<svg id={'top-svg-id'}
					 width={canvasWidth}
					 height={topCanvasHeight}
					 style={{ backgroundColor: '$backgroundColor' }}
				>
					<InfoPanel/>
					<Header/>
					{dates.map((value, index) => (
						<DateItem key={index}
								  data={value}
								  x={BOARD_ITEM_WIDTH + DATE_ITEM_WIDTH * index}
								  y={HEADER_HEIGHT}/>))}
				</svg>
				<div
					ref={bottomSvgContainerRef}
					style={{
						width: '100%',
						height: bottomSvgContainerHeight,
						overflowY: 'scroll'
					}}>
					<svg id={'bottom-svg-id'}
						 width={canvasWidth}
						 height={bottomCanvasHeight}
						 style={{ backgroundColor: '$backgroundColor' }}
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
			</div>
		</Space>
	)
}

export default Main