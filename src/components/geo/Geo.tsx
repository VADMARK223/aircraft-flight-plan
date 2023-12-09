/**
 * Компонент
 *
 * @author Markitanov Vadim
 * @since 08.12.2023
 */
import React, { JSX, LegacyRef, useRef } from 'react'
import { useDraggableSvg } from '../../hooks/useDraggableSvg'
import { Button, Space } from 'antd'

const CANVAS_WIDTH = 300
const CANVAS_HEIGHT = 300
const WORKSPACE_SIZE = 500
const WORKSPACE_WIDTH = WORKSPACE_SIZE
const WORKSPACE_HEIGHT = WORKSPACE_SIZE

const Geo = (): JSX.Element => {
	const datesRef: LegacyRef<SVGSVGElement> = useRef<SVGSVGElement>(null)
	const boardsRef: LegacyRef<SVGSVGElement> = useRef<SVGSVGElement>(null)
	const flightsRef: LegacyRef<SVGSVGElement> = useRef<SVGSVGElement>(null)
	useDraggableSvg(datesRef, 'horizontal')
	useDraggableSvg(boardsRef, 'vertical')
	useDraggableSvg(flightsRef)

	return (
		<Space direction={'vertical'} size={0}>
			<Space size={0}>
				<Button>Test1</Button>
				<div>
					<svg
						style={{
							width: CANVAS_WIDTH,
							height: CANVAS_HEIGHT
						}}>
						<g cursor={'pointer'} id={'INFO'}>
							<rect
								width={WORKSPACE_WIDTH}
								height={WORKSPACE_HEIGHT}
								fill={'blue'}
							/>
							<line
								x2={WORKSPACE_WIDTH}
								y2={WORKSPACE_HEIGHT}
								stroke={'white'}
							/>
							<line
								y1={WORKSPACE_HEIGHT}
								x2={WORKSPACE_WIDTH}
								stroke={'white'}
							/>
						</g>
					</svg>
				</div>
				<div>
					<svg
						ref={datesRef}
						style={{
							width: CANVAS_WIDTH,
							height: CANVAS_HEIGHT
						}}>
						<g cursor={'pointer'} id={'DATES'}>
							<rect
								width={WORKSPACE_WIDTH}
								height={WORKSPACE_HEIGHT}
								fill={'brown'}
							/>
							<line
								x2={WORKSPACE_WIDTH}
								y2={WORKSPACE_HEIGHT}
								stroke={'white'}
							/>
							<line
								y1={WORKSPACE_HEIGHT}
								x2={WORKSPACE_WIDTH}
								stroke={'white'}
							/>
						</g>
					</svg>
				</div>
			</Space>

			<Space size={0}>
				<Button>Test2</Button>
				<div>
					<svg
						ref={boardsRef}
						style={{
							width: CANVAS_WIDTH,
							height: CANVAS_HEIGHT
						}}>
						<g cursor={'pointer'} id={'BOARDS'}>
							<rect
								width={WORKSPACE_WIDTH}
								height={WORKSPACE_HEIGHT}
								fill={'green'}
							/>
							<line
								x2={WORKSPACE_WIDTH}
								y2={WORKSPACE_HEIGHT}
								stroke={'white'}
							/>
							<line
								y1={WORKSPACE_HEIGHT}
								x2={WORKSPACE_WIDTH}
								stroke={'white'}
							/>
						</g>
					</svg>
				</div>
				<div>
					<svg
						ref={flightsRef}
						style={{
							width: CANVAS_WIDTH,
							height: CANVAS_HEIGHT
						}}>
						<g>
							<rect
								width={WORKSPACE_WIDTH}
								height={WORKSPACE_HEIGHT}
								fill={'gray'}
							/>
							<line
								x2={WORKSPACE_WIDTH}
								y2={WORKSPACE_HEIGHT}
								stroke={'white'}
							/>
							<line
								y1={WORKSPACE_HEIGHT}
								x2={WORKSPACE_WIDTH}
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