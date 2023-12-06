import React from 'react'
import ReactDOM from 'react-dom/client'
import './style/index.scss'
import App from './App'
import { ConfigProvider, theme } from 'antd'
import ruRu from 'antd/locale/ru_RU'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
)
root.render(
	<ConfigProvider
		locale={ruRu}
		theme={{
			// algorithm: isDarkTheme === 'false' ? theme.darkAlgorithm : theme.defaultAlgorithm,
			algorithm: theme.defaultAlgorithm,

			token: {
				motion: true // Настройка анимаций
				// colorPrimary: '#57965c',
				// colorBgContainer: '#f6ffed',
			}
		}}
	>
		<React.StrictMode>
			<App/>
			<ToastContainer position={'bottom-right'}/>
		</React.StrictMode>
	</ConfigProvider>
)
