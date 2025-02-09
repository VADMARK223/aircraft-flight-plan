/**
 * Компонент представления перелета
 *
 * @author Markitanov Vadim
 * @since 07.12.2023
 */
import React, { JSX, LegacyRef, useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { Route } from '../../../../../models/Route'
import { $routeSelected, routeClickFx } from '../../../../../store/route'
import { CELL_HEIGHT, FLIGHT_CELL_WIDTH, ROUTE_ITEM_HEIGHT } from '../../../../../utils/consts'
import { $style, StyleStore } from '../../../../../store/style'
import { useStore } from 'effector-react'
import { appendRotateText, drawAirportText, drawText, drawTextRotate, drawTopText } from '../../../../../utils/utils'
import { lightGreenColor } from '../../../../../utils/style'
import { setContextMenuFx } from '../../../../../store/contextMenu'
import { RouteType, RouteTypeNames, drawArrows, isMaintenance } from './routeUtils'
import { $settings } from '../../../../../store/settings'
import { Dayjs } from 'dayjs'

// Тип обрезки перелета
export enum CropType {
	NONE, // Не обрезан
	START, // Начало обрезано
	END // Конец обрезан
}

interface RouteItemProps {
	x: number
	y: number
	width: number
	data: Route
	cropType: CropType
	vda: number
}

const CROP_MARKER_COLOR = 'black'

const RouteItem = (props: RouteItemProps): JSX.Element => {
	const style: StyleStore = useStore($style)
	const textColor = style.textColor
	const settings = useStore($settings)
	const routeSelect = useStore($routeSelected)
	const { x, y, width, data, cropType } = props
	const gRef: LegacyRef<SVGGElement> = useRef<SVGGElement>(null)
	const isSelect = data.id === routeSelect?.id
	const isDefault = data.routeTypeId === RouteType.DEFAULT

	console.log()

	useEffect(() => {
		const svg = d3.select(gRef.current)
		svg.selectAll('*').remove()

		svg.attr('cursor', 'pointer')
		svg.on('click', () => {
			routeClickFx(data)
		}).on('contextmenu', (event: PointerEvent) => {
			event.preventDefault()
			setContextMenuFx({
				isFlight: true,
				x: event.offsetX - FLIGHT_CELL_WIDTH,
				y: event.offsetY,
				data: data
			})
		})

		const getBackgroundColor = (): string => {
			if (isDefault) {
				return lightGreenColor
			}

			if (data.routeTypeId === RouteType.ROUTINE_MAINTENANCE) {
				return 'gray'
			}

			return 'orange'
		}

		const TOP_Y = y + (CELL_HEIGHT - ROUTE_ITEM_HEIGHT) * 0.5
		const CENTER_X = x + width * 0.5

		// Заливка фона
		svg.append('rect')
			.attr('x', x)
			.attr('y', TOP_Y)
			.attr('width', width)
			.attr('height', ROUTE_ITEM_HEIGHT)
			.attr('stroke', isSelect ? 'red' : isDefault ? 'green' : 'orange')
			.attr('stroke-width', isSelect ? '3' : '1')
			.attr('fill', getBackgroundColor)

		// Верхний текст
		drawTopText(svg, `VDA ${props.vda}`, CENTER_X, TOP_Y, 'pointer', textColor)

		const CROP_ARROW_WIDTH = 30
		// Если перелет обрезан рисуем треугольник
		if (cropType === CropType.START) {
			svg.append('polygon')
				.attr('points', `
				${x},${y + (CELL_HEIGHT) * 0.5} 
				${x + CROP_ARROW_WIDTH},${TOP_Y}
				${x + CROP_ARROW_WIDTH},${TOP_Y + ROUTE_ITEM_HEIGHT}`)
				.attr('fill', CROP_MARKER_COLOR)
		} else if (cropType === CropType.END) {
			svg.append('polygon')
				.attr('points', `
				${x + width - CROP_ARROW_WIDTH},${TOP_Y}
				${x + width},${y + (CELL_HEIGHT) * 0.5}
				${x + width - CROP_ARROW_WIDTH},${TOP_Y + ROUTE_ITEM_HEIGHT}`)
				.attr('fill', CROP_MARKER_COLOR)
		}

		// Рисуем текс по центру
		if (!isDefault) {
			if (isMaintenance(data.routeTypeId)) {
				const routeTypeLabel = RouteTypeNames[data.routeTypeId as RouteType]
				drawText(svg, routeTypeLabel, CENTER_X, y + CELL_HEIGHT * 0.5 + 1, 'pointer')
			}
		}

		/*const textSelection = drawAirportText(container, data.aptDeptIata ?? '', x + 2, TOP_Y + 1)
		const textSelectionBox: SVGRect | undefined = textSelection.node().getBBox()
		if (textSelectionBox !== undefined) {
			drawAirportText(container, data.aptArrIata ?? '', textSelectionBox.x, textSelectionBox.y + textSelectionBox.height)
		}*/

		const scheduledDepartureDay: Dayjs = data.scheduledDepartureDate
		const scheduledDepartureTime: string = scheduledDepartureDay.format('HH:mm')
		const scheduledDepartureDate: string = scheduledDepartureDay.format('DD.MM.YYYY')

		const scheduledArrivalDay: Dayjs = data.scheduledArrivalDate
		const scheduledArrivalTime: string = scheduledArrivalDay.format('HH:mm')
		const scheduledArrivalDate: string = scheduledArrivalDay.format('DD.MM.YYYY')

		if (settings.showDates) {
			// Верхние даты
			const timeRotate = -19
			appendRotateText(svg, textColor, x, TOP_Y, scheduledDepartureTime, timeRotate)
			appendRotateText(svg, textColor, x + width, TOP_Y, scheduledArrivalTime, timeRotate)

			// Нижние даты
			const dateRotate = 19
			appendRotateText(svg, textColor, x, TOP_Y + ROUTE_ITEM_HEIGHT, scheduledDepartureDate, dateRotate, 'hanging')
			appendRotateText(svg, textColor, x + width, TOP_Y + ROUTE_ITEM_HEIGHT, scheduledArrivalDate, dateRotate, 'hanging')
		}
		// Аэропорты
		drawAirportText(svg, textColor, data.aptDeptIata, x, TOP_Y + ROUTE_ITEM_HEIGHT, 'end')
		drawAirportText(svg, textColor, data.aptArrIata, x + width, TOP_Y + ROUTE_ITEM_HEIGHT, 'start')
		// Время
		if (!isMaintenance(data.routeTypeId)) {
			const SHIFT_FOR_TIME = 7
			drawTextRotate(svg, scheduledDepartureTime, CENTER_X - SHIFT_FOR_TIME, y + CELL_HEIGHT * 0.5 + 1, 'pointer')
			drawTextRotate(svg, scheduledArrivalTime, CENTER_X + SHIFT_FOR_TIME, y + CELL_HEIGHT * 0.5 + 1, 'pointer')
		}

		// Стрелки
		if (!isMaintenance(data.routeTypeId)) {
			drawArrows(svg, CENTER_X, TOP_Y)
		}
	}, [x, y, width, data, style, isDefault, isSelect, settings])

	return (
		<g ref={gRef} id={`flight-item-${data.id}`}/>
	)
}

export default RouteItem
