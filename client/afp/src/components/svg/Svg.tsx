/**
 * Компонент перетаскиваемой рабочей области.
 *
 * @author Markitanov Vadim
 * @since 08.12.2023
 */
import React, { JSX, LegacyRef, useEffect, useRef, useState } from 'react'
import { useDraggableSvg } from '../../hooks/useDraggableSvg'
import { Space } from 'antd'
import { $ui } from '../../store/ui'
import { useStore } from 'effector-react'
import { CELL_HEIGHT, FLIGHT_CELL_WIDTH, DATE_ITEM_HEIGHT, HEADER_HEIGHT } from '../../utils/consts'
import Dates from './dates/Dates'
import InfoPanel from '../frame/InfoPanel'
import Boards from '../common/flights/Flights'
import Background from './Background'
import Routes from '../common/routes/Routes'
import Header from './Header'

const Svg = (): JSX.Element => {
	const ui = useStore($ui)
	const containerRef = useRef<HTMLDivElement>(null)
	const datesRef: LegacyRef<SVGSVGElement> = useRef<SVGSVGElement>(null)
	const boardsRef: LegacyRef<SVGSVGElement> = useRef<SVGSVGElement>(null)
	const flightsRef: LegacyRef<SVGSVGElement> = useRef<SVGSVGElement>(null)
	const [svgDimensions, setSvgDimension] = useState({ width: 100, height: 100 })
	useDraggableSvg(datesRef, 'horizontal')
	useDraggableSvg(boardsRef, 'vertical')
	useDraggableSvg(flightsRef)

	useEffect(() => {
		const updateSvgDimensions = () => {
			if (!containerRef.current) {
				return
			}
			const screenHeight = window.innerHeight
			const screenWidth = window.innerWidth
			const top = containerRef.current.getBoundingClientRect().top
			const left = containerRef.current.getBoundingClientRect().left
			const newContainerWidth = screenWidth - left - FLIGHT_CELL_WIDTH - 15
			const newContainerHeight = screenHeight - top - HEADER_HEIGHT - CELL_HEIGHT + 20
			setSvgDimension({ width: newContainerWidth, height: newContainerHeight })
		}
		updateSvgDimensions()
		window.addEventListener('resize', updateSvgDimensions)
		return () => {
			window.removeEventListener('resize', updateSvgDimensions)
		}
	}, [])

	return (
		<Space
			ref={containerRef}
			direction={'vertical'}
			size={0}
		>
			<Space size={0} align={'start'}>
				<div>
					<svg
						style={{ width: FLIGHT_CELL_WIDTH, height: HEADER_HEIGHT + DATE_ITEM_HEIGHT }}
					>
						<g cursor={'pointer'} id={'INFO'}>
							<InfoPanel/>

						</g>
					</svg>
				</div>
				<div>
					<svg
						ref={datesRef}
						viewBox={`${ui.x},0,${svgDimensions.width},${HEADER_HEIGHT + DATE_ITEM_HEIGHT}`}
						style={{ width: svgDimensions.width, height: HEADER_HEIGHT + DATE_ITEM_HEIGHT }}
					>
						<Dates/>
						<Header/>
					</svg>
				</div>
			</Space>

			<Space size={0} align={'start'}>
				<div style={{ marginTop: -5 }}>
					<svg
						ref={boardsRef}
						viewBox={`0,${ui.y},${FLIGHT_CELL_WIDTH},${svgDimensions.height}`}
						style={{ width: FLIGHT_CELL_WIDTH, height: svgDimensions.height }}
					>
						<Boards/>

					</svg>
				</div>
				<div style={{ marginTop: -5 }}>
					<svg
						ref={flightsRef}
						viewBox={`${ui.x},${ui.y},${svgDimensions.width},${svgDimensions.height}`}
						style={{ width: svgDimensions.width, height: svgDimensions.height }}
					>
						<Background/>
						<Routes/>

					</svg>
				</div>
			</Space>
		</Space>
	)
}

export default Svg
