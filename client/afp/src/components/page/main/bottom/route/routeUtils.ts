import { ROUTE_ITEM_HEIGHT } from '../../../../../utils/consts'

/**
 * @author Markitanov Vadim
 * @since 25.01.2025
 */
export enum RouteType {
	ROUTINE_MAINTENANCE = 0,
	DEFAULT = 1,
	URGENT = 2
}

export const RouteTypeNames: Record<RouteType, string> = {
	[RouteType.ROUTINE_MAINTENANCE]: 'FERRY',
	[RouteType.DEFAULT]: 'LIVE',
	[RouteType.URGENT]: 'CHARTER'
}

const SHIFT_FOR_ARROWS = 23
const ARROW_WIDTH = 6
const ARROW_HEIGHT = 6
const ARROW_DOWN = 'arrow-down' as const
const ARROW_UP = 'arrow-up' as const

export const drawArrows = (svg: any, centerX: number, topY: number) => {
	drawArrow(ARROW_DOWN, svg, centerX, topY)
	drawArrow(ARROW_UP, svg, centerX, topY)
}

export const drawArrow = (id: typeof ARROW_DOWN | typeof ARROW_UP, svg: any, centerX: number, topY: number) => {
	const marker = svg.append('defs')
		.append('marker')
		.attr('id', id)
		.attr('refX', ARROW_WIDTH * 0.5)
		.attr('refY', id === ARROW_UP ? 0 : ARROW_HEIGHT)
		.attr('markerWidth', ARROW_WIDTH)
		.attr('markerHeight', ARROW_HEIGHT)
		.append('path')
		.attr('d', `M 0 0 L ${ARROW_WIDTH} 0 L ${ARROW_WIDTH * 0.5} ${ARROW_HEIGHT} z`)
		.attr('fill', 'black')

	if (id === ARROW_UP) {
		marker.attr('transform', `rotate(180,${ARROW_WIDTH * 0.5},${ARROW_WIDTH * 0.5})`)
	}

	const shift = id === ARROW_UP ? SHIFT_FOR_ARROWS : -SHIFT_FOR_ARROWS
	drawLine(svg, centerX + shift, topY, centerX + shift, topY + ROUTE_ITEM_HEIGHT, id)
}

const drawLine = (svg: any, x1: number, y1: number, x2: number, y2: number, id: typeof ARROW_DOWN | typeof ARROW_UP) => {
	svg.append('line')
		.attr('x1', x1)
		.attr('y1', y1)
		.attr('x2', x2)
		.attr('y2', y2)
		.attr('stroke', 'black')
		.attr('stroke-width', 2)
		.attr(id === ARROW_UP ? 'marker-start' : 'marker-end', `url(#${id})`)
}

export const isMaintenance = (routeTypeId: number): boolean => {
	return routeTypeId === RouteType.ROUTINE_MAINTENANCE
}
