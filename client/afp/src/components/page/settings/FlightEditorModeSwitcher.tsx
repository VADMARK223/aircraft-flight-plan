/**
 * Компонент переключателя режима редактирования рейса.
 *
 * @author Markitanov Vadim
 * @since 08.01.2025
 */
import React, { JSX } from 'react'
import { Switch, Space } from 'antd'
import { LocalStoreKey, LocalStoreValue } from '../../../utils/localStorage'
import { flightEditModeChanged, $settings } from '../../../store/settings'
import { useStore } from 'effector-react'

const FlightEditorModeSwitcher = (): JSX.Element => {
	const settings = useStore($settings)

	const changeHandler = (value: boolean) => {
		flightEditModeChanged(true)
		if (value) {
			localStorage.setItem(LocalStoreKey.FLIGHT_EDIT_MODE, LocalStoreValue.FLIGHT_EDIT_MODE)
		} else {
			localStorage.removeItem(LocalStoreKey.FLIGHT_EDIT_MODE)
		}
	}

	return (
		<Space direction={'horizontal'}>
			<span>Flight editing mode:</span>
			<Switch
				className={'monochromatic-switch'}
				checkedChildren={'Select'}
				unCheckedChildren={'Modal'}
				onChange={changeHandler}
				defaultChecked={settings.flightEditMode}
			/>
		</Space>
	)
}

export default FlightEditorModeSwitcher
