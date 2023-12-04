/**
 * Компонент управлением полета
 *
 * @author Markitanov Vadim
 * @since 23.11.2023
 */
import React, { JSX } from 'react'
import AddFlightPanel from './AddFlightPanel'
import { useStore } from 'effector-react'
import { $flightsSelect } from '../../../store/flight'
import EditFlightPanel from './EditFlightPanel'

const FlightControl = (): JSX.Element => {
	const flightsSelect = useStore($flightsSelect)

	return (
		<>
			{flightsSelect === null ? <AddFlightPanel/> : <EditFlightPanel data={flightsSelect}/>}
		</>
	)
}

export default FlightControl