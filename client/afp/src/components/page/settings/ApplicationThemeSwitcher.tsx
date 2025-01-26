/**
 * Компонент
 *
 * @author Markitanov Vadim
 * @since 26.01.2025
 */
import React, { JSX } from 'react'
import { Switch, Space } from 'antd'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import { useStore } from 'effector-react'
import { $style, setDarkTheme } from '../../../store/style'
import { LocalStoreKey, LocalStoreValue } from '../../../utils/localStorage'

const ApplicationThemeSwitcher = (): JSX.Element => {
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
        <Space direction={'horizontal'}>
            <span>Dark theme:</span>
            <Switch
                checkedChildren={<CheckOutlined/>}
                unCheckedChildren={<CloseOutlined/>}
                onChange={onStyleChangeHandler}
                defaultChecked={style.isDarkTheme}
            />

        </Space>
	)
}

export default ApplicationThemeSwitcher
