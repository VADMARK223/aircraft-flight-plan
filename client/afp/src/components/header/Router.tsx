/**
 * Компонент
 *
 * @author Markitanov Vadim
 * @since 17.12.2024
 */
import React, { JSX } from 'react'
import { Route, Routes } from 'react-router-dom'
import MainPage from '../page/main/MainPage'
import SettingsPage from '../page/settings/SettingsPage'
import StatsPage from '../page/stats/StatsPage'

const Router = (): JSX.Element => {
	return (
		<Routes>
			<Route path="/" element={<MainPage/>}/>
			<Route path="/settings" element={<SettingsPage/>}/>
			<Route path="/stats" element={<StatsPage/>}/>
		</Routes>
	)
}

export default Router
