/**
 * Компонент страницы настроек.
 *
 * @author Markitanov Vadim
 * @since 16.12.2024
 */
import React, { JSX } from 'react'
import { Space, Switch } from 'antd'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import { setDarkTheme, $style} from '../../../store/style'
import { useStore } from 'effector-react'
import FlightEditorModeSwitcher from './FlightEditorModeSwitcher'
import { $settings, showDatesChanged } from '../../../store/settings'
import { LocalStoreKey, LocalStoreValue } from '../../../utils/localStorage'

const SettingsPage = (): JSX.Element => {
	const settings = useStore($settings)
	const style = useStore($style)

	const onStyleChangeHandler = (value: boolean): void => {
		setDarkTheme(value)
		if (value) {
			localStorage.setItem(LocalStoreKey.THEME, LocalStoreValue.THEME)
		} else {
			localStorage.removeItem(LocalStoreKey.THEME)
		}
	}

	const onVisibleDatesChangeHandler = (value: boolean): void => {
		showDatesChanged(value)
		if (value) {
			localStorage.setItem(LocalStoreKey.DATE_VISIBILITY, LocalStoreValue.SHOW)
		} else {
			localStorage.removeItem(LocalStoreKey.DATE_VISIBILITY)
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
			<Switch
				checkedChildren={'Show dates'}
				unCheckedChildren={'Hide dates'}
				onChange={onVisibleDatesChangeHandler}
				defaultChecked={settings.showDates}
			/>
			<Space direction={'horizontal'}>
				<span>Flight editing mode:</span>
				<FlightEditorModeSwitcher/>
			</Space>
		</Space>
	)
}

export default SettingsPage
