/**
 * Компонент
 *
 * @author Markitanov Vadim
 * @since 26.01.2025
 */
import React, { JSX } from 'react'
import { Switch } from 'antd'
import { showDatesChanged, $settings } from '../../../store/settings'
import { LocalStoreKey, LocalStoreValue } from '../../../utils/localStorage'
import { useStore } from 'effector-react'

const DateVisibilityToggle = (): JSX.Element => {
    const settings = useStore($settings)

    const onVisibleDatesChangeHandler = (value: boolean): void => {
        showDatesChanged(value)
        if (value) {
            localStorage.setItem(LocalStoreKey.DATE_VISIBILITY, LocalStoreValue.SHOW)
        } else {
            localStorage.removeItem(LocalStoreKey.DATE_VISIBILITY)
        }
    }

	return (
        <Switch
            checkedChildren={'Show dates'}
            unCheckedChildren={'Hide dates'}
            onChange={onVisibleDatesChangeHandler}
            defaultChecked={settings.showDates}
        />
	)
}

export default DateVisibilityToggle
