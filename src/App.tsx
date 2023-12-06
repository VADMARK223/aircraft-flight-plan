import React, { useEffect } from 'react'
import { ConfigProvider, theme } from 'antd'
import ruRu from 'antd/locale/ru_RU'
import Main from './Main'
import { useStore } from 'effector-react'
import { $style, setBackgroundColorFx, setLineColorFx, setTextColorFx } from './store/style'

function App () {
	const style = useStore($style)

	const getComputedStyleByPropertyValue = (property: string, isDark: boolean) => {
		return getComputedStyle(document.documentElement).getPropertyValue(`--${property}${isDark ? '-dark' : ''}`)
	}

	useEffect(() => {
		const backgroudColor = getComputedStyleByPropertyValue('backgroundColor', style.isDarkTheme)
		document.documentElement.style.backgroundColor = backgroudColor;
		setBackgroundColorFx(backgroudColor)
		setTextColorFx(getComputedStyleByPropertyValue('textColor', style.isDarkTheme))
		setLineColorFx(getComputedStyleByPropertyValue('lineColor', style.isDarkTheme))
	}, [style.isDarkTheme])

	return (
		<>
			<ConfigProvider
				locale={ruRu}
				theme={{
					algorithm: style.isDarkTheme ? theme.darkAlgorithm : theme.defaultAlgorithm,

					token: {
						motion: true // Настройка анимаций
						// colorPrimary: '#57965c',
						// colorBgContainer: '#f6ffed',
					}
				}}
			>
				<div className={`app ${style.isDarkTheme ? 'dark-theme' : 'light-theme'}`}>
					<Main/>
				</div>
			</ConfigProvider>
		</>
	)
}

export default App
