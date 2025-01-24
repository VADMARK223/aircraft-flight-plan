import React, { JSX, useEffect } from 'react'
import { ConfigProvider, theme } from 'antd'
import ruRu from 'antd/locale/ru_RU'
import { useStore } from 'effector-react'
import {
	$style,
	setBackgroundColor,
	setContextMenuBackgroundColor,
	setContextMenuLineColor,
	setLineColor,
	setTextColor
} from './store/style'
import { RouterProvider, createBrowserRouter, Outlet } from 'react-router-dom'
import Header from './components/header/Header'
import MainPage from './components/page/main/MainPage'
import SettingsPage from './components/page/settings/SettingsPage'
import StatsPage from './components/page/stats/StatsPage'
import ErrorPage from './components/page/ErrorPage'
import { Paths } from './components/header/Paths'
import HomePage from './components/page/home/HomePage'
import FlightPage from './components/page/flight/FlightPage'

function App () {
	const style = useStore($style)
	const isDarkTheme = style.isDarkTheme

	const getComputedStyleByPropertyValue = (property: string, isDark: boolean) => {
		return getComputedStyle(document.documentElement).getPropertyValue(`--${property}${isDark ? '-dark' : ''}`)
	}

	useEffect(() => {
		const backgroundColor = getComputedStyleByPropertyValue('backgroundColor', isDarkTheme)
		document.documentElement.style.backgroundColor = backgroundColor
		setBackgroundColor(backgroundColor)
		setTextColor(getComputedStyleByPropertyValue('textColor', isDarkTheme))
		setLineColor(getComputedStyleByPropertyValue('lineColor', isDarkTheme))
		setContextMenuBackgroundColor(getComputedStyleByPropertyValue('contextMenuBackgroundColor', isDarkTheme))
		setContextMenuLineColor(getComputedStyleByPropertyValue('contextMenuLineColor', isDarkTheme))
	}, [isDarkTheme])

	const router = createBrowserRouter(
		[
			{
				path: Paths.HOME,
				element: <RootLayout/>,
				errorElement: <ErrorPage/>,
				children: [
					{ index: true, element: <HomePage/> },
					{ path: Paths.MAIN, element: <MainPage/> },
					{ path: Paths.SETTINGS, element: <SettingsPage/> },
					{ path: Paths.FLIGHT, element: <FlightPage/> },
					{ path: Paths.STATS, element: <StatsPage/> }
				],
			}
		]
	)

	return (
		<ConfigProvider
			locale={ruRu}
			theme={{
				algorithm: isDarkTheme ? theme.darkAlgorithm : theme.defaultAlgorithm,

				token: {
					motion: true // Настройка анимаций
				}
			}}
		>
			<div className={`app ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}>
				<RouterProvider router={router}/>
			</div>
		</ConfigProvider>
	)
}

export default App

const RootLayout = (): JSX.Element => (
	<div>
		<div style={{ marginBottom: '5px' }}>
			<Header/>
		</div>
		<Outlet/>
	</div>
)
