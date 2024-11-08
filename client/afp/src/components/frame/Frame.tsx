/**
 * Компонент скролируемой рабочей области.
 *
 * @author Markitanov Vadim
 * @since 20.12.2023
 */
import React, { JSX, useEffect, useRef, useState } from 'react'
import InfoPanel from './InfoPanel'
import Header from './Header'
import DateItem from '../svg/dates/DateItem'
import {
	BOARD_ITEM_HEIGHT,
	BOARD_ITEM_WIDTH,
	DATE_ITEM_HEIGHT,
	DATE_ITEM_WIDTH,
	HEADER_HEIGHT
} from '../../utils/consts'
import Background from './Background'
import Border from './Border'
import { Space } from 'antd'
import { useStore } from 'effector-react'
import { $dates } from '../../store/date'
import { $boards } from '../../store/board'
import Flights from '../common/flights/Flights'
import Boards from '../common/boards/Boards'

const Frame = (): JSX.Element => {
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

	useEffect(() => {
		setTopCanvasHeight(HEADER_HEIGHT + DATE_ITEM_HEIGHT)
		setBottomCanvasHeight(boards.length * BOARD_ITEM_HEIGHT)
	}, [boards])

	return (
		<Space direction={'vertical'} size={'small'}>
			<div>
				<svg id={'top-svg-id'}
					 width={canvasWidth}
					 height={topCanvasHeight}
					 style={{ backgroundColor: '$backgroundColor' }}
				>
					<InfoPanel/>
					<Header/>
					<g cursor={'pointer'} id={'DATES'}>
						{dates.map((value, index) => (
							<DateItem key={index}
									  data={value}
									  x={BOARD_ITEM_WIDTH + DATE_ITEM_WIDTH * index}
									  y={HEADER_HEIGHT}/>))}
					</g>
				</svg>
				<div
					ref={bottomSvgContainerRef}
					style={{
						width: '100%',
						height: bottomSvgContainerHeight,
						overflowY: 'scroll',
						marginTop: -5
					}}>
					<svg id={'bottom-svg-id'}
						 width={canvasWidth}
						 height={bottomCanvasHeight}
						 style={{ backgroundColor: '$backgroundColor' }}
					>
						<Boards/>
						{/*{boards.map((value, index) => (
							<BoardItem key={value.id}
									   data={value}
									   x={0}
									   y={BOARD_ITEM_HEIGHT * index}
									   width={BOARD_ITEM_WIDTH}
									   height={BOARD_ITEM_HEIGHT}/>))}*/}
						<Background/>
						<Flights/>
						<Border/>
					</svg>

				</div>
			</div>
		</Space>
	)
}

export default Frame