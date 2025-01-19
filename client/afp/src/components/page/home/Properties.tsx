/**
 * Компонент свойств выбранных компонентов.
 *
 * @author Markitanov Vadim
 * @since 19.01.2025
 */
import React, { JSX } from 'react'
import { useStore } from 'effector-react'
import { $routeSelected } from '../../../store/route'
import { $flightsSelected } from '../../../store/flight'
import FlightsInfo from './flights/FlightsInfo'

const Properties = (): JSX.Element => {
	const flightsSelected = useStore($flightsSelected)
	const routeSelected = useStore($routeSelected)

	return (
		<div>
			<FlightsInfo data={flightsSelected}/><br/>
			{routeSelected == null
				? <span>Перелет не выбран</span>
				: <span>Выбран перелет: {routeSelected.id}</span>}

		</div>
	)
}

export default Properties
