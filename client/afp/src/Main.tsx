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

const Main = (): JSX.Element => {
	// const test = useStore($test)

	useEffect(() => {
		if (!LOCAL_MODE) {
			fetchFlightsFx()
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
