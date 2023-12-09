/**
 * Компонент
 *
 * @author Markitanov Vadim
 * @since 08.12.2023
 */
import { JSX, LegacyRef, useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import { D3ZoomEvent } from 'd3'

interface Dimensions {
	width: number
	height: number
}

const Geo = (): JSX.Element => {
	const svgRef: LegacyRef<SVGSVGElement> = useRef<SVGSVGElement>(null)
	const [dimensions, setDimensions] = useState<Dimensions>({ width: 0, height: 0 })
	const CANVAS_WIDTH = 300
	const CANVAS_HEIGHT = 300

	const WORKSPACE_SIZE = 350
	const WORKSPACE_WIDTH = WORKSPACE_SIZE
	const WORKSPACE_HEIGHT = WORKSPACE_SIZE

	useEffect(() => {
		const observableTarget = svgRef.current
		if (observableTarget === null) {
			return
		}

		const svg = d3.select(svgRef.current)
		svg.attr('viewBox', [0, 0, CANVAS_WIDTH, CANVAS_HEIGHT])
		svg.attr('width', CANVAS_WIDTH)
		svg.attr('height', CANVAS_HEIGHT)

		const g = svg.select('g')
		g.attr('cursor', 'pointer')

		g.append('rect')
			.attr('id', 'TARGET')
			.attr('width', WORKSPACE_WIDTH)
			.attr('height', WORKSPACE_HEIGHT)
			.attr('fill', 'green')

		g.append('line')
			.attr('x1', 0)
			.attr('y1', 0)
			.attr('x2', WORKSPACE_WIDTH)
			.attr('y2', WORKSPACE_HEIGHT)
			.attr('stroke', 'white')

		g.append('line')
			.attr('x1', 0)
			.attr('y1', WORKSPACE_HEIGHT)
			.attr('x2', WORKSPACE_WIDTH)
			.attr('y2', 0)
			.attr('stroke', 'white')

		const resizeObserver = new ResizeObserver(entries => {
			entries.forEach(value => {
				setDimensions(value.contentRect)
			})
		})
		resizeObserver.observe(observableTarget)
		return () => resizeObserver.unobserve(observableTarget)
	}, [svgRef, WORKSPACE_WIDTH, WORKSPACE_HEIGHT])

	useEffect(() => {
		const svg: any = d3.select(svgRef.current)
		const g = svg.select('g')

		const zoomed = (event: D3ZoomEvent<any, any>) => {
			const transform = event.transform
			let x = transform.x
			let y = transform.y
			const k = 1
			if (x >= 0) {
				x = 0
			}
			if (y >= 0) {
				y = 0
			}

			const tempX = WORKSPACE_WIDTH - CANVAS_WIDTH + x
			if (tempX <= 0) {
				x = CANVAS_WIDTH - WORKSPACE_WIDTH
			}

			const tempY = WORKSPACE_HEIGHT - CANVAS_HEIGHT + y
			if (tempY <= 0) {
				y = CANVAS_HEIGHT - WORKSPACE_HEIGHT
			}

			g.attr('transform', `translate(${x}, ${y}) scale(${k})`)
		}

		if (WORKSPACE_WIDTH > CANVAS_WIDTH || WORKSPACE_HEIGHT > CANVAS_HEIGHT) {
			svg.call(d3.zoom()
				// .extent([[0, 0], [dimensions.width, dimensions.height]])
				.scaleExtent([0.5, 2]) // Ограничения zoom (Можно уменьшить в  половину и у величтиь в 2 раза)
				.on('zoom', zoomed))
		}
		else {
			console.log('NOT')
		}
	}, [dimensions, WORKSPACE_WIDTH, WORKSPACE_HEIGHT])

	return (
		<svg ref={svgRef}>
			<g></g>
			Component Geo
		</svg>
	)
}

export default Geo