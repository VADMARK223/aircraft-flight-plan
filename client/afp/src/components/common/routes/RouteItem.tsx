/**
 * Компонент представления перелета
 *
 * @author Markitanov Vadim
 * @since 07.12.2023
 */
import React, { JSX, LegacyRef, useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { Route } from '../../../models/Route'
import { $routeSelected, routeClickFx } from '../../../store/route'
import { CELL_HEIGHT, FLIGHT_CELL_WIDTH, ROUTE_ITEM_HEIGHT } from '../../../utils/consts'
import { $style, StyleStore } from '../../../store/style'
import { useStore } from 'effector-react'
import { appendRotateText, drawAirportText, drawText } from '../../../utils/utils'
import { RouteType } from '../../../models/type/RouteType'
import { greenColor } from '../../../utils/style'
import { setContextMenuFx } from '../../../store/contextMenu'
import { $ui } from '../../../store/ui'
import { $test } from '../../../store/test'

// Тип обрезки перелета
export enum CropType {
	NONE, // Не обрезан
	START, // Начало обрезано
	END // Конец обрезан
}

interface FlightItemProps {
	x: number
	y: number
	width: number
	data: Route
	cropType: CropType
}

const RouteItem = (props: FlightItemProps): JSX.Element => {
	const style: StyleStore = useStore($style)
	const ui = useStore($ui)
	const routeSelect = useStore($routeSelected)
	const { x, y, width, data, cropType } = props
	const gRef: LegacyRef<SVGGElement> = useRef<SVGGElement>(null)
	const isSelect = data.id === routeSelect?.id
	const isDefault = data.routeTypeId === RouteType.DEFAULT
	const test = useStore($test)

	useEffect(() => {
		const container = d3.select(gRef.current)
		container.selectAll('*').remove()

		container.attr('cursor', 'pointer')
		container.on('click', () => {
			routeClickFx(data)
		}).on('contextmenu', (event: PointerEvent) => {
			event.preventDefault()
			setContextMenuFx({
				isFlight: true,
				x: test ? event.offsetX + ui.x : event.offsetX - FLIGHT_CELL_WIDTH,
				y: test ? event.offsetY + ui.y : event.offsetY,
				data: data
			})
		})

		const getBackgroundColor = (): string => {
			if (isDefault) {
				return greenColor
			}

			if (data.routeTypeId === RouteType.ROUTINE_MAINTENANCE) {
				return 'gray'
			}

			return 'orange'
		}

		const TOP_Y = y + (CELL_HEIGHT - ROUTE_ITEM_HEIGHT) * 0.5

		// Заливка фона
		container.append('rect')
			.attr('x', x)
			.attr('y', TOP_Y)
			.attr('width', width)
			.attr('height', ROUTE_ITEM_HEIGHT)
			.attr('stroke', isSelect ? 'red' : isDefault ? 'green' : 'orange')
			.attr('stroke-width', isSelect ? '3' : '1')
			.attr('fill', getBackgroundColor)

		const ARROW_WIDTH = 30

		// Если перелет обрезан рисуем треугольник
		if (cropType === CropType.START) {
			container.append('polygon')
				.attr('points', `
				${x},${y + (CELL_HEIGHT) * 0.5} 
				${x + ARROW_WIDTH},${TOP_Y}
				${x + ARROW_WIDTH},${TOP_Y + ROUTE_ITEM_HEIGHT}`)
				.attr('fill', 'green')
		} else if (cropType === CropType.END) {
			container.append('polygon')
				.attr('points', `
				${x + width - ARROW_WIDTH},${TOP_Y}
				${x + width},${y + (CELL_HEIGHT) * 0.5}
				${x + width - ARROW_WIDTH},${TOP_Y + ROUTE_ITEM_HEIGHT}`)
				.attr('fill', 'green')
		}

		if (!isDefault) {
			const routeTypeLabel = data.routeTypeId === RouteType.ROUTINE_MAINTENANCE ? 'Тех. обслуживание' : 'Срочный'
			drawText(container, routeTypeLabel, x + width * 0.5, y + CELL_HEIGHT * 0.5 + 1, 'pointer')
		}

		const textSelection = drawAirportText(container, data.aptDeptIata ?? '', x + 2, TOP_Y + 1)
		const textSelectionBox: SVGRect | undefined = textSelection.node().getBBox()
		if (textSelectionBox !== undefined) {
			drawAirportText(container, data.aptArrIata ?? '', textSelectionBox.x, textSelectionBox.y + textSelectionBox.height)
		}

		const timeRotate = -19
		appendRotateText(container, style.textColor, x, TOP_Y, data.scheduledDepartureDate.format('HH:mm'), timeRotate)
		appendRotateText(container, style.textColor, x + width, TOP_Y, data.scheduledArrivalDate.format('HH:mm'), timeRotate)

		const dateRotate = 19
		appendRotateText(container, style.textColor, x, TOP_Y + ROUTE_ITEM_HEIGHT, data.scheduledDepartureDate.format('DD.MM.YYYY'), dateRotate, 'hanging')
		appendRotateText(container, style.textColor, x + width, TOP_Y + ROUTE_ITEM_HEIGHT, data.scheduledArrivalDate.format('DD.MM.YYYY'), dateRotate, 'hanging')
	}, [x, y, width, data, style, isDefault, isSelect, ui.x, ui.y, test])

	return (
		<g ref={gRef} id={`flight-item-${data.id}`}/>
	)
}

export default RouteItem
