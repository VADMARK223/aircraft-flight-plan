/**
 * Компонент контекстного меню полётов.
 *
 * @author Markitanov Vadim
 * @since 07.12.2023
 */
import React,{ JSX, LegacyRef, useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { Route } from '../../models/Route'
import { useStore } from 'effector-react'
import { $style } from '../../store/style'
import { $contextMenu, resetContextMenuFx } from '../../store/contextMenu'
import { Flight } from '../../models/Flight'

interface MenuItemModel {
	title: string
	action: (datum: Route | Flight) => void
}

interface ContextMenuProps {
	menuItems: MenuItemModel[]
}

const ContextMenu = (props: ContextMenuProps): JSX.Element => {
	const { menuItems } = props
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
				.attr('y', (_, index) => contextMenu.y + (index * 30))
				.attr('width', 150)
				.attr('height', 30)
				.attr('stroke', style.contextMenuLineColor)
				.attr('fill', style.contextMenuBackgroundColor)

			container.selectAll('.context-menu-item')
				.append('text')
				.text((datum: any) => datum.title)
				.attr('x', contextMenu.x)
				.attr('y', (_, index) => contextMenu.y + (index * 30))
				.attr('dx', 5)
				.attr('dy', 6)
				.attr('dominant-baseline', 'hanging')
				.attr('fill', style.textColor)
		}

		d3.select('body')
			.on('click', () => {
				resetContextMenuFx()
			})
	}, [menuItems, contextMenu, style])
	return (
		<g ref={gRef}/>
	)
}

export default ContextMenu
