import React, { useEffect, useState } from 'react'
import * as d3 from 'd3'
import { D3DragEvent } from 'd3'
import { $ui, updatePosFx } from '../store/ui'
import { useStore } from 'effector-react'

/**
 * @author Markitanov Vadim
 * @since 09.12.2023
 */

export type DragDirection = 'horizontal' | 'vertical' | undefined

export const useDraggableSvg = (ref: React.RefObject<SVGSVGElement>, direction: DragDirection = undefined) => {
	const ui = useStore($ui)
	const [dimensions, setDimensions] = useState<DOMRectReadOnly>({
		x: 0,
		y: 0,
		width: 0,
		height: 0,
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		toJSON (): any {
		}
	})

	useEffect(() => {
		const observeTarget = ref.current
		if (observeTarget === null) {
			return
		}
		const resizeObserver = new ResizeObserver(entries => {
			entries.forEach(entry => {
				setDimensions(entry.contentRect)
			})
		})
		resizeObserver.observe(observeTarget)
		return () => resizeObserver.unobserve(observeTarget)
	}, [ref])

	useEffect(() => {
		const svg: any = d3.select(ref.current)
		const g: any = svg.select('g')
		const box = g.node().getBBox()

		const groupWidth = box.width
		const groupHeight = box.height

		svg.attr('width', dimensions.width).attr('height', dimensions.height)

		/*const onZoom = (event: D3ZoomEvent<SVGSVGElement, undefined>) => {
			const transform: ZoomTransform = event.transform
			let x = transform.x >= 0 ? 0 : transform.x
			let y = transform.y >= 0 ? 0 : transform.y
			const tempX = groupWidth - dimensions.width + x
			if (tempX <= 0) {
				x = dimensions.width - groupWidth
			}

			const tempY = groupHeight - dimensions.height + y
			if (tempY <= 0) {
				y = dimensions.height - groupHeight
			}

			g.attr('transform', `translate(${x}, ${y})`)
		}

		if (groupWidth > dimensions.width || groupHeight > dimensions.height) {
			svg.call(d3.zoom()
				.extent([[0, 0], [dimensions.width, dimensions.height]])
				.scaleExtent([0.5, 2])
				.on('zoom', onZoom))
		}*/

		const changeX = (tempX: number) => {
			ui.x = tempX <= 0 ? 0 : tempX
			if (groupWidth - dimensions.width - tempX < 0) {
				ui.x = groupWidth - dimensions.width
			}
		}

		const changeY = (tempY: number) => {
			ui.y = tempY <= 0 ? 0 : tempY
			if (groupHeight - dimensions.height - tempY < 0) {
				ui.y = groupHeight - dimensions.height
			}
		}

		svg.call(d3.drag().on('drag', (event: D3DragEvent<SVGSVGElement, unknown, unknown>) => {
			const tempX = ui.x - event.dx
			const tempY = ui.y - event.dy

			if (direction === undefined) {
				changeX(tempX)
				changeY(tempY)
			} else if (direction === 'horizontal') {
				changeX(tempX)
			} else if (direction === 'vertical') {
				changeY(tempY)
			}

			updatePosFx({ x: ui.x, y: ui.y })
		}))

	}, [ui, direction, ref, dimensions])

	return dimensions
}