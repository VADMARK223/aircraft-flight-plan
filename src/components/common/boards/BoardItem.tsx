/**
 * Компонент
 *
 * @author Markitanov Vadim
 * @since 22.11.2023
 */
import { JSX, LegacyRef, useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { BOARD_ITEM_WIDTH } from '../../../utils/consts'
import { Board } from '../../../models/Board'
import { useStore } from 'effector-react'
import { $style } from '../../../store/style'
import { $boardSelect, boardClickFx } from '../../../store/board'
import { BoardType } from '../../../models/BoardType'
import { greenColor, redColor } from '../../../utils/style'
import { $test } from '../../../store/test'
import { $ui } from '../../../store/ui'
import { setContextMenuFx } from '../../../store/contextMenu'

interface BoardItemProps {
	data: Board
	x: number
	y: number
	width: number
	height: number
}

const BoardItem = (props: BoardItemProps): JSX.Element => {
	const { data, x, y, width, height } = props
	const style = useStore($style)
	const boardSelect = useStore($boardSelect)
	const gRef: LegacyRef<SVGGElement> = useRef<SVGGElement>(null)
	const test = useStore($test)
	const ui = useStore($ui)

	useEffect(() => {
		const container = d3.select(gRef.current)
			.attr('cursor', 'pointer')
			.on('click', (_: PointerEvent): void => {
				boardClickFx(data)
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

		const getColorByType = (type: BoardType.LOW | BoardType.DEFAULT | BoardType.PRIORITY) => {
			switch (type) {
				case BoardType.LOW:
					return greenColor
				case BoardType.DEFAULT:
					return style.textColor
				case BoardType.PRIORITY:
					return redColor
			}
		}

		container.append('text')
			.attr('x', x + 5)
			.attr('y', y + 5)
			.attr('fill', data.type !== undefined ? getColorByType(data.type) : style.textColor)
			.attr('font-weight', 'bold')
			.attr('text-anchor', 'start')
			.attr('dominant-baseline', 'hanging')
			.text(data.name)

		const lineShiftX = 5
		const lineShiftY = 25
		container.append('line')
			.attr('stroke', style.lineColor)
			.attr('stroke-width', 1)
			.attr('x1', x + lineShiftX)
			.attr('y1', y + lineShiftY)
			.attr('x2', x + BOARD_ITEM_WIDTH - 2 * lineShiftX)
			.attr('y2', y + lineShiftY)

		container.append('text')
			.attr('x', x + 5)
			.attr('y', y + 33)
			.attr('fill', style.textColor)
			.attr('text-anchor', 'start')
			.attr('dominant-baseline', 'hanging')
			.text(data.flights.length ? `Полетов: ${data.flights.length}` : 'Нет полетов')

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

	}, [test, ui.y, style, data.name, x, y, width, height, data.type, data.flights.length, data, boardSelect])

	return (
		<g ref={gRef}/>
	)
}

export default BoardItem