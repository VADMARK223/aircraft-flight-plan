/**
 * Компонент контекстного меню полётов.
 *
 * @author Markitanov Vadim
 * @since 07.12.2023
 */
import React, { JSX, LegacyRef, useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { Route } from '../../models/Route'
import { useStore } from 'effector-react'
import { $style } from '../../store/style'
import { $contextMenu, resetContextMenuFx, ContextMenuModel } from '../../store/contextMenu'
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
	const contextMenu: ContextMenuModel | null = useStore($contextMenu)
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
			// const totalItems = menuItems.length
			container.selectAll('.context-menu-item')
				.append('rect')
				.attr('x', contextMenu.x)
				.attr('y', (_, index) => contextMenu.y + (index * 30))
				.attr('width', 80)
				.attr('height', 30)
				// .attr('rx', (d, index) => {
				// 	if (index === 0 || index === totalItems - 1) return 8
				// 	return 0
				// })
				// .attr('ry', (d, index) => {
				// 	if (index === 0 || index === totalItems - 1) return 8
				// 	return 0
				// })
				.attr('stroke', style.contextMenuLineColor)
				.attr('fill', style.contextMenuBackgroundColor)
				// .each(function (_, index) {
				// 	const rect = d3.select(this)
				// 	const isFirst = index === 0
				// 	const isLast = index === totalItems - 1
				//
				// 	if (isFirst || isLast) {
				// 		const x = +rect.attr('x')
				// 		const y = +rect.attr('y')
				// 		const width = +rect.attr('width')
				// 		const height = +rect.attr('height')
				// 		const radius = 8
				//
				// 		const path = `M${x},${y + (isFirst ? radius : 0)}
				// 			${isFirst ? `a${radius},${radius} 0 0 1 ${radius},-${radius}` : `l0,-${radius}`}
				// 			l${width - 2 * radius},0
				// 			${isFirst ? `a${radius},${radius} 0 0 1 ${radius},${radius}` : `l0,${radius}`}
				// 			l0,${height - (isFirst && isLast ? 2 * radius : radius)}
				// 			${isLast ? `a${radius},${radius} 0 0 1 -${radius},${radius}` : ''}
				// 			l-${width - 2 * radius},0
				// 			${isLast ? `a${radius},${radius} 0 0 1 -${radius},-${radius}` : ''}
				// 			l0,-${height - (isFirst && isLast ? 2 * radius : radius)}
				// 			z`
				//
				// 		rect.remove()
				// 		container.append('path')
				// 			.attr('d', path)
				// 			.attr('fill', style.contextMenuBackgroundColor)
				// 			.attr('stroke', style.contextMenuLineColor)
				// 	}
				// })

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
