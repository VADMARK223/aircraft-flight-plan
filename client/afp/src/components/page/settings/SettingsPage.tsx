/**
 * Компонент
 *
 * @author Markitanov Vadim
 * @since 16.12.2024
 */
import React, { JSX } from 'react'
import { Space, Switch } from 'antd'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import { setDarkTheme, THEME_LOCAL_STORAGE_KEY, THEME_LOCAL_STORAGE_VALUE, $style } from '../../../store/style'
import { useStore } from 'effector-react'

const SettingsPage = (): JSX.Element => {
	const style = useStore($style)

	const onStyleChangeHandler = (value: boolean): void => {
		setDarkTheme(value)
		if (value) {
			localStorage.setItem(THEME_LOCAL_STORAGE_KEY, THEME_LOCAL_STORAGE_VALUE)
		} else {
			localStorage.removeItem(THEME_LOCAL_STORAGE_KEY)
		}
	}

	return (
		<Space direction={'vertical'}>
			<Space direction={'horizontal'}>
				<span>Тёмная тема:</span>
				<Switch
					checkedChildren={<CheckOutlined/>}
					unCheckedChildren={<CloseOutlined/>}
					onChange={onStyleChangeHandler}
					defaultChecked={style.isDarkTheme}
				/>
			</Space>
		</Space>
	)
}

export default SettingsPage
