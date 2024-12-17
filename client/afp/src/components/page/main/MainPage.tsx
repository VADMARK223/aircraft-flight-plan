/**
 * Главная страница.
 *
 * @author Markitanov Vadim
 * @since 06.12.2023
 */
import React, { JSX, useEffect } from 'react'
import TopPanel from './top/TopPanel'
import BottomPanel from './bottom/BottomPanel'
import { fetchFlightsFx } from '../../../api/flight'
import { fetchRouteTypeFx, fetchAircraftTypeFx } from '../../../api/dict'

const MainPage = (): JSX.Element => {
	useEffect(() => {
		fetchFlightsFx()
		fetchRouteTypeFx()
		fetchAircraftTypeFx()
	}, [])

	return (
		<>
			<TopPanel/>
			<BottomPanel/>
		</>
	)
}

export default MainPage
