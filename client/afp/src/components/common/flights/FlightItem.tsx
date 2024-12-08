/**
 * Компонент представления перелета.
 *
 * @author Markitanov Vadim
 * @since 22.11.2023
 */
import { JSX, LegacyRef, useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { FLIGHT_CELL_WIDTH } from '../../../utils/consts'
import { Flight } from '../../../models/Flight'
import { useStore } from 'effector-react'
import { $style } from '../../../store/style'
import { $flightSelected, flightClickFx } from '../../../store/flight'
import { $test } from '../../../store/test'
import { $ui } from '../../../store/ui'
import { setContextMenuFx } from '../../../store/contextMenu'

interface BoardItemProps {
	data: Flight
	x: number
	y: number
	width: number
	height: number
}

const FlightItem = (props: BoardItemProps): JSX.Element => {
	const { data, x, y, width, height } = props
	const style = useStore($style)
	const boardSelect = useStore($flightSelected)
	const gRef: LegacyRef<SVGGElement> = useRef<SVGGElement>(null)
	const test = useStore($test)
	const ui = useStore($ui)

	useEffect(() => {
		const container = d3.select(gRef.current)
			.attr('cursor', 'pointer')
			.on('click', (_: PointerEvent): void => {
				flightClickFx(data)
			})
			.on('contextmenu', (event: PointerEvent) => {
				event.preventDefault()
				setContextMenuFx({
					isFlight: false,
					x: 0,
					y: test ? event.offsetY + ui.y : event.offsetY,
					data: data
				})
			})

		const isSelect = data.id === boardSelect?.id

		container.append('rect')
			.attr('x', x)
			.attr('y', y)
			.attr('width', width)
			.attr('height', height)
			.attr('stroke', style.lineColor)
			.attr('fill', style.backgroundColor)

		container.append('text')
			.attr('x', x + 5)
			.attr('y', y + 5)
			.attr('fill', style.textColor)
			.attr('font-weight', 'bold')
			.attr('text-anchor', 'start')
			.attr('dominant-baseline', 'hanging')
			.text(`Рейс ${data.id} (${data.contractId})`)

		const lineShiftX = 5
		const lineShiftY = 25
		container.append('line')
			.attr('stroke', style.lineColor)
			.attr('stroke-width', 1)
			.attr('x1', x + lineShiftX)
			.attr('y1', y + lineShiftY)
			.attr('x2', x + FLIGHT_CELL_WIDTH - 2 * lineShiftX)
			.attr('y2', y + lineShiftY)

		container.append('text')
			.attr('x', x + 5)
			.attr('y', y + 33)
			.attr('fill', style.textColor)
			.attr('text-anchor', 'start')
			.attr('dominant-baseline', 'hanging')
			.text(data.routes.length ? `Перелетов: ${data.routes.length}` : 'Нет перелетов')

		if (isSelect) {
			const selectStrokeWidth = 3
			container.append('rect')
				.attr('x', x + selectStrokeWidth)
				.attr('y', y + selectStrokeWidth)
				.attr('width', width - selectStrokeWidth * 2)
				.attr('height', height - selectStrokeWidth * 2)
				.attr('fill', 'transparent')
				.attr('stroke', 'red')
				.attr('stroke-width', selectStrokeWidth)
		}

	}, [test, ui.y, style, x, y, width, height, data.routes.length, data, boardSelect])

	return (
		<g ref={gRef}/>
	)
}

export default FlightItem
