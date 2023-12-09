/**
 * Компонент
 *
 * @author Markitanov Vadim
 * @since 08.12.2023
 */
import React, { JSX, LegacyRef, useRef } from 'react'
import { useDraggableSvg } from '../../hooks/useDraggableSvg'
import { Space } from 'antd'
import { $ui } from '../../store/ui'
import { useStore } from 'effector-react'
import {
	BOARD_ITEM_HEIGHT,
	BOARD_ITEM_WIDTH,
	DATE_ITEM_HEIGHT,
	DATE_ITEM_WIDTH,
	HEADER_HEIGHT
} from '../../utils/consts'
import { $dates } from '../../store/date'
import { $boards } from '../../store/board'
import Boards from '../boards/Boards'
import Dates from '../dates/Dates'
import InfoPanel from '../InfoPanel'
import Flights from '../flights/Flights'
import Background from '../Background'

const CANVAS_WIDTH = 300
const CANVAS_HEIGHT = 300

const Geo = (): JSX.Element => {
	const ui = useStore($ui)
	const dates = useStore($dates)
	const boards = useStore($boards)
	const datesRef: LegacyRef<SVGSVGElement> = useRef<SVGSVGElement>(null)
	const boardsRef: LegacyRef<SVGSVGElement> = useRef<SVGSVGElement>(null)
	const flightsRef: LegacyRef<SVGSVGElement> = useRef<SVGSVGElement>(null)
	useDraggableSvg(datesRef, 'horizontal')
	useDraggableSvg(boardsRef, 'vertical')
	useDraggableSvg(flightsRef)

	return (
		<Space direction={'vertical'} size={0}>
			<Space size={0} align={'start'}>
				<div>
					<svg
						style={{ width: BOARD_ITEM_WIDTH, height: HEADER_HEIGHT + DATE_ITEM_HEIGHT }}
					>
						<g cursor={'pointer'} id={'INFO'}>
							<InfoPanel/>
						</g>
					</svg>
				</div>
				<div>
					<svg
						ref={datesRef}
						viewBox={`${ui.x},0,${CANVAS_WIDTH},${HEADER_HEIGHT + DATE_ITEM_HEIGHT}`}
						style={{ width: CANVAS_WIDTH, height: HEADER_HEIGHT + DATE_ITEM_HEIGHT }}
					>
						<Dates/>
					</svg>
				</div>
			</Space>

			<Space size={0} align={'start'}>
				<div>
					<svg
						ref={boardsRef}
						viewBox={`0,${ui.y},${BOARD_ITEM_WIDTH},${CANVAS_HEIGHT}`}
						style={{ width: BOARD_ITEM_WIDTH, height: CANVAS_HEIGHT }}
					>
						<Boards/>
					</svg>
				</div>
				<div>
					<svg
						ref={flightsRef}
						viewBox={`${ui.x},${ui.y},${CANVAS_WIDTH},${CANVAS_HEIGHT}`}
						style={{ width: CANVAS_WIDTH, height: CANVAS_HEIGHT }}
					>
						<g cursor={'pointer'}>
							<rect
								width={DATE_ITEM_WIDTH * dates.length}
								height={BOARD_ITEM_HEIGHT * boards.length}
								fill={'gray'}
							/>
							<line
								x2={DATE_ITEM_WIDTH * dates.length}
								y2={BOARD_ITEM_HEIGHT * boards.length}
								stroke={'white'}
							/>
							<line
								y1={BOARD_ITEM_HEIGHT * boards.length}
								x2={DATE_ITEM_WIDTH * dates.length}
								stroke={'white'}
							/>
						</g>
					</svg>
				</div>
			</Space>
		</Space>
	)
}

export default Geo