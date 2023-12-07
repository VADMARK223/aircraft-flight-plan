/**
 * Компонент для контекстного меню полетов.
 *
 * @author Markitanov Vadim
 * @since 07.12.2023
 */
import * as d3 from 'd3'
import { Flight } from '../../models/Flight'
import { flightClickFx, flightDeleteFx } from '../../store/flight'

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
			flightDeleteFx(datum.id)
		}
	}
]

export const createContextMenu = (container: d3.Selection<Element, any, any, any>, x: number, y: number, flight: Flight, closeCallback: () => void) => {
	container.append('g')
		.attr('class', 'context-menu')
		.selectAll('tmp')
		.data(menuItems).enter()
		.append('g').attr('class', 'context-menu-item')
		.attr('cursor', 'pointer')
		.on('click', (_, datum) => {
			datum.action(flight)
			closeCallback()
		})

	container.selectAll('.context-menu-item')
		.append('rect')
		.attr('x', x)
		.attr('y', (datum, index) => y + (index * 30))
		.attr('width', 150)
		.attr('height', 30)
		.attr('fill', 'white')

	container.selectAll('.context-menu-item')
		.append('text')
		.text((datum: any) => datum.title)
		.attr('x', x)
		.attr('y', (datum, index) => y + (index * 30))
		.attr('dx', 5)
		.attr('dy', 6)
		.attr('dominant-baseline', 'hanging')
		.attr('fill', 'black')

	d3.select('body').on('click', () => {
		d3.select('.context-menu').remove()
		closeCallback()
	})
}