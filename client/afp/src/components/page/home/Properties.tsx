/**
 * Компонент свойств выбранных компонентов.
 *
 * @author Markitanov Vadim
 * @since 19.01.2025
 */
import React, { JSX } from 'react'
import { useStore } from 'effector-react'
import { $routeSelected } from '../../../store/route'
import FlightsInfo from './flights/FlightsInfo'

const Properties = (): JSX.Element => {
	const routeSelected = useStore($routeSelected)

	return (
		<div>
			<FlightsInfo/><br/>
			{routeSelected == null
				? <span>Route not selected.</span>
				: <span>Route selected: {routeSelected.id}</span>}

		</div>
	)
}

export default Properties
