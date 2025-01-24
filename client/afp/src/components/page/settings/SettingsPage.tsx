/**
 * Компонент страницы настроек.
 *
 * @author Markitanov Vadim
 * @since 16.12.2024
 */
import React, { JSX } from 'react'
import { Space, Switch } from 'antd'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import { setDarkTheme, LocalStoreValue, $style, LocalStoreKey } from '../../../store/style'
import { useStore } from 'effector-react'
import FlightEditorModeSwitcher from './FlightEditorModeSwitcher'

const SettingsPage = (): JSX.Element => {
	const style = useStore($style)

	const onStyleChangeHandler = (value: boolean): void => {
		setDarkTheme(value)
		if (value) {
			localStorage.setItem(LocalStoreKey.THEME, LocalStoreValue.THEME)
		} else {
			localStorage.removeItem(LocalStoreKey.THEME)
		}
	}

	return (
		<Space direction={'vertical'}>
			<Space direction={'horizontal'}>
				<span>Dark theme:</span>
				<Switch
					checkedChildren={<CheckOutlined/>}
					unCheckedChildren={<CloseOutlined/>}
					onChange={onStyleChangeHandler}
					defaultChecked={style.isDarkTheme}
				/>
			</Space>
			<Space direction={'horizontal'}>
				<span>Flight editing mode:</span>
				<FlightEditorModeSwitcher/>
			</Space>
		</Space>
	)
}

export default SettingsPage
