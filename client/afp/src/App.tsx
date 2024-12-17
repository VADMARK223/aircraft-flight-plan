import React, { useEffect } from 'react'
import { ConfigProvider, theme } from 'antd'
import ruRu from 'antd/locale/ru_RU'
import { useStore } from 'effector-react'
import {
	$style,
	setBackgroundColorFx,
	setContextMenuBackgroundColorFx,
	setContextMenuLineColorFx,
	setLineColorFx,
	setTextColorFx
} from './store/style'
import { BrowserRouter } from 'react-router-dom'
import Header from './components/header/Header'
import Router from './components/header/Router'

function App () {
	const style = useStore($style)
	const isDarkTheme = style.isDarkTheme

	const getComputedStyleByPropertyValue = (property: string, isDark: boolean) => {
		return getComputedStyle(document.documentElement).getPropertyValue(`--${property}${isDark ? '-dark' : ''}`)
	}

	useEffect(() => {
		const backgroundColor = getComputedStyleByPropertyValue('backgroundColor', isDarkTheme)
		document.documentElement.style.backgroundColor = backgroundColor
		setBackgroundColorFx(backgroundColor)
		setTextColorFx(getComputedStyleByPropertyValue('textColor', isDarkTheme))
		setLineColorFx(getComputedStyleByPropertyValue('lineColor', isDarkTheme))
		setContextMenuBackgroundColorFx(getComputedStyleByPropertyValue('contextMenuBackgroundColor', isDarkTheme))
		setContextMenuLineColorFx(getComputedStyleByPropertyValue('contextMenuLineColor', isDarkTheme))
	}, [isDarkTheme])

	return (
		<BrowserRouter future={{ v7_startTransition: true }}>
			<ConfigProvider
				locale={ruRu}
				theme={{
					algorithm: isDarkTheme ? theme.darkAlgorithm : theme.defaultAlgorithm,

					token: {
						motion: true // Настройка анимаций
						// colorPrimary: '#57965c',
						// colorBgContainer: '#f6ffed',
					}
				}}
			>
				<div className={`app ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}>
					<Header/>
					<Router/>
				</div>
			</ConfigProvider>
		</BrowserRouter>
	)
}

export default App
