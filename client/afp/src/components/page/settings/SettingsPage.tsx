/**
 * Компонент страницы настроек.
 *
 * @author Markitanov Vadim
 * @since 16.12.2024
 */
import React, { JSX } from 'react'
import { Space } from 'antd'
import FlightEditorModeSwitcher from './FlightEditorModeSwitcher'
import DateVisibilityToggle from './DateVisibilityToggle'
import ApplicationThemeSwitcher from './ApplicationThemeSwitcher'

const SettingsPage = (): JSX.Element => {
	return (
		<Space direction={'vertical'}>
			<ApplicationThemeSwitcher/>
			<DateVisibilityToggle/>
			<FlightEditorModeSwitcher/>
		</Space>
	)
}

export default SettingsPage
