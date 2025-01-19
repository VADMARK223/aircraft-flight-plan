/**
 * Компонент свойств выбранных компонентов.
 *
 * @author Markitanov Vadim
 * @since 19.01.2025
 */
import React, { JSX } from 'react'
import { useStore } from 'effector-react'
import { $flightSelected } from '../../../store/flight'
import { $routeSelected } from '../../../store/route'

const Properties = (): JSX.Element => {
	const selectedFlight = useStore($flightSelected)
	const routeSelected = useStore($routeSelected)

	return (
		<div>
			{selectedFlight == null
				? <span>Рейс не выбран</span>
				: <span>Выбран рейс: {selectedFlight.id}</span>}
			<br/>
			{routeSelected == null
				? <span>Перелет не выбран</span>
				: <span>Выбран перелет: {routeSelected.id}</span>}
		</div>
	)
}

export default Properties
