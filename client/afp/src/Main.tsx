/**
 * Компонент для рабочих областей.
 *
 * @author Markitanov Vadim
 * @since 06.12.2023
 */
import React, { JSX, useEffect } from 'react'
import ControlPanel from './components/controlPanel/ControlPanel'
import Viewer from './components/viewer/Viewer'
import { fetchFlightsFx } from './api/flight'
import { LOCAL_MODE } from './utils/consts'
import { FlightsSchema } from './models/zodSchemas'
import { showError, showSuccess } from './api/common'

const Main = (): JSX.Element => {
	// const test = useStore($test)

	useEffect(() => {
		if (!LOCAL_MODE) {
			fetchFlightsFx()
		}

		const flightsFromServer = [
			{
				id: 1,
				routes: [
					{
						id: 11,
						flightId: 1,
						scheduledDepartureDate: '2024-12-02T13:05:31.279526',
						scheduledArrivalDate: '2024-12-02T13:05:31.279526'
					}
				]
			},
			{
				id: 2,
				routes: []
			}
		]

		try {
			const resultSafeParse = FlightsSchema.safeParse(flightsFromServer)
			// showSuccess('resultSafeParse: ' + resultSafeParse)
			if (resultSafeParse.success) {
				console.log('Converted flights:', resultSafeParse.data)
			}
		} catch (e) {
			showError('Error: ' + e)
			console.log('>>>:', e)
		}

	}, [])

	return (
		<>
			<ControlPanel/>
			<Viewer/>
			{/*<Frame/>*/}
			{/*{test ? <Svg/> : <Frame/>}*/}
		</>
	)
}

export default Main
