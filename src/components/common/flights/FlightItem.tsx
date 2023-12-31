/**
 * Компонент представления полета
 *
 * @author Markitanov Vadim
 * @since 07.12.2023
 */
import { JSX, LegacyRef, useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { Flight } from '../../../models/Flight'
import { $flightsSelect, flightClickFx } from '../../../store/flight'
import { BOARD_ITEM_HEIGHT, BOARD_ITEM_WIDTH, FLIGHT_ITEM_HEIGHT } from '../../../utils/consts'
import { $style, StyleStore } from '../../../store/style'
import { useStore } from 'effector-react'
import { appendRotateText, drawAirportText, drawText } from '../../../utils/utils'
import { FlightType } from '../../../models/FlightType'
import { greenColor } from '../../../utils/style'
import { setContextMenuFx } from '../../../store/contextMenu'
import { $ui } from '../../../store/ui'
import { $test } from '../../../store/test'

interface FlightItemProps {
	x: number
	y: number
	width: number
	data: Flight
}

const FlightItem = (props: FlightItemProps): JSX.Element => {
	const style: StyleStore = useStore($style)
	const ui = useStore($ui)
	const flightsSelect = useStore($flightsSelect)
	const { x, y, width, data } = props
	const gRef: LegacyRef<SVGGElement> = useRef<SVGGElement>(null)
	const isSelect = data.id === flightsSelect?.id
	const isDefault = data.type === FlightType.DEFAULT
	const test = useStore($test)

	useEffect(() => {
		const container = d3.select(gRef.current)
		container.selectAll('*').remove()

		container.attr('cursor', 'pointer')
		container.on('click', (_: PointerEvent) => {
			flightClickFx(data)
		}).on('contextmenu', (event: PointerEvent) => {
			event.preventDefault()
			setContextMenuFx({
				isFlight: true,
				x: test ? event.offsetX + ui.x : event.offsetX - BOARD_ITEM_WIDTH,
				y: test ? event.offsetY + ui.y : event.offsetY,
				data: data
			})
		})

		container.append('rect')
			.attr('x', x)
			.attr('y', y + (BOARD_ITEM_HEIGHT - FLIGHT_ITEM_HEIGHT) * 0.5)
			.attr('width', width)
			.attr('height', FLIGHT_ITEM_HEIGHT)
			.attr('stroke', isSelect ? 'red' : isDefault ? 'green' : 'orange')
			.attr('stroke-width', isSelect ? '3' : '1')
			.attr('fill', isDefault ? greenColor : 'orange')

		if (!isDefault) {
			drawText(container, 'Тех. обслуживание', x + width * 0.5, y + BOARD_ITEM_HEIGHT * 0.5 + 1, 'pointer')
		}

		const textSelection = drawAirportText(container, data.airportStart, x + 2, y + (BOARD_ITEM_HEIGHT - FLIGHT_ITEM_HEIGHT) * 0.5 + 1)
		const textSelectionBox: SVGRect | undefined = textSelection.node().getBBox()
		if (textSelectionBox !== undefined) {
			drawAirportText(container, data.airportEnd, textSelectionBox.x, textSelectionBox.y + textSelectionBox.height)
		}

		const timeRotate: number = -19
		appendRotateText(container, style.textColor, x, y + (BOARD_ITEM_HEIGHT - FLIGHT_ITEM_HEIGHT) * 0.5, data.startDate.format('HH:mm'), timeRotate)
		appendRotateText(container, style.textColor, x + width, y + (BOARD_ITEM_HEIGHT - FLIGHT_ITEM_HEIGHT) * 0.5, data.endDate.format('HH:mm'), timeRotate)

		const dateRotate: number = 19
		appendRotateText(container, style.textColor, x, y + (BOARD_ITEM_HEIGHT - FLIGHT_ITEM_HEIGHT) * 0.5 + FLIGHT_ITEM_HEIGHT, data.startDate.format('DD.MM.YYYY'), dateRotate, 'hanging')
		appendRotateText(container, style.textColor, x + width, y + (BOARD_ITEM_HEIGHT - FLIGHT_ITEM_HEIGHT) * 0.5 + FLIGHT_ITEM_HEIGHT, data.endDate.format('DD.MM.YYYY'), dateRotate, 'hanging')
	}, [x, y, width, data, style, isDefault, isSelect, ui.x, ui.y, test])

	return (
		<g ref={gRef} id={`flight-item-${data.id}`}/>
	)
}

export default FlightItem