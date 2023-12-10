/**
 * Компонент контекстного меню полётов.
 *
 * @author Markitanov Vadim
 * @since 07.12.2023
 */
import { JSX, LegacyRef, useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { Flight } from '../../models/Flight'
import { flightClickFx, flightDeleteFx } from '../../store/flight'
import { useStore } from 'effector-react'
import { $style } from '../../store/style'
import { $contextMenu, resetContextMenuFx } from '../../store/contextMenu'

interface MenuItemModel {
	title: string
	action: (datum: Flight) => void
}

const menuItems: MenuItemModel[] = [
	{
		title: 'Редактировать',
		action: (datum: Flight) => {
			flightClickFx(datum)
		}
	}, {
		title: 'Удалить',
		action: (datum: Flight) => {
			flightDeleteFx(datum)
		}
	}
]

const ContextMenu = (): JSX.Element => {
	const style = useStore($style)
	const contextMenu = useStore($contextMenu)
	const gRef: LegacyRef<SVGGElement> = useRef<SVGGElement>(null)

	useEffect(() => {
		const container = d3.select(gRef.current)
		container.selectAll('*').remove()
		container.append('g')
			.attr('class', 'context-menu')
			.selectAll('tmp')
			.data(menuItems).enter()
			.append('g').attr('class', 'context-menu-item')
			.attr('cursor', 'pointer')
			.on('click', (_, datum) => {
				if (contextMenu) {
					datum.action(contextMenu.data)
				}
			})

		if (contextMenu) {
			container.selectAll('.context-menu-item')
				.append('rect')
				.attr('x', contextMenu.x)
				.attr('y', (datum, index) => contextMenu.y + (index * 30))
				.attr('width', 150)
				.attr('height', 30)
				.attr('stroke', style.contextMenuLineColor)
				.attr('fill', style.contextMenuBackgroundColor)

			container.selectAll('.context-menu-item')
				.append('text')
				.text((datum: any) => datum.title)
				.attr('x', contextMenu.x)
				.attr('y', (datum, index) => contextMenu.y + (index * 30))
				.attr('dx', 5)
				.attr('dy', 6)
				.attr('dominant-baseline', 'hanging')
				.attr('fill', style.textColor)
		}

		d3.select('body').on('click', () => {
			resetContextMenuFx()
		})
	}, [contextMenu, style])
	return (
		<g ref={gRef}/>
	)
}

export default ContextMenu