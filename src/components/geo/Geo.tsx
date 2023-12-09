/**
 * Компонент
 *
 * @author Markitanov Vadim
 * @since 08.12.2023
 */
import { JSX, LegacyRef, useRef } from 'react'
import { useDraggableSvg } from '../../hooks/useDraggableSvg'

const CANVAS_WIDTH = 300
const CANVAS_HEIGHT = 300
const WORKSPACE_SIZE = 500
const WORKSPACE_WIDTH = WORKSPACE_SIZE
const WORKSPACE_HEIGHT = WORKSPACE_SIZE

const Geo = (): JSX.Element => {
	const svgRef: LegacyRef<SVGSVGElement> = useRef<SVGSVGElement>(null)
	useDraggableSvg(svgRef)

	return (
		<svg ref={svgRef} style={{
			width: CANVAS_WIDTH,
			height: CANVAS_HEIGHT
			// width: '100vw',
			// height: '100vh'
		}}>
			<g cursor={'pointer'} id={'TARGET'}>
				<rect
					// style={{ width: '200vw', height: '200vh' }}
					width={WORKSPACE_WIDTH}
					height={WORKSPACE_HEIGHT}
					fill={'green'}
				/>
				<line
					x2={WORKSPACE_WIDTH}
					y2={WORKSPACE_HEIGHT}
					// x2={'200vw'}
					// y2={'200vh'}
					stroke={'white'}
				/>
				<line
					y1={WORKSPACE_HEIGHT}
					x2={WORKSPACE_WIDTH}
					// y1={'200vh'}
					// x2={'200vw'}
					stroke={'white'}
				/>
			</g>
		</svg>
	)
}

export default Geo