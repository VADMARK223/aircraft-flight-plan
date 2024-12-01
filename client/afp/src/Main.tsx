/**
 * Компонент для рабочих областей.
 *
 * @author Markitanov Vadim
 * @since 06.12.2023
 */
import React, { JSX } from 'react'
import ControlPanel from './components/controlPanel/ControlPanel'
import Viewer from './components/viewer/Viewer'

const Main = (): JSX.Element => {
	// const test = useStore($test)

	// useEffect(() => {
	// 	fetchRoutesFx().then((value: any) => {
	// 		console.log('Routes:', value)
	// 	})
	//
	// 	fetchFlightsFx().then((value: FlightDto | null) => {
	// 		console.log('Flights:', value)
	// 	})
	//
	// }, [])

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
