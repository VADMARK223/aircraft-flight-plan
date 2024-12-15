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
import { fetchAircraftTypeFx, fetchRouteTypeFx } from './api/dict'

const Main = (): JSX.Element => {
	// const test = useStore($test)

	useEffect(() => {
		fetchFlightsFx()
		fetchRouteTypeFx()
		fetchAircraftTypeFx()
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
