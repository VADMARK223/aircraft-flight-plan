/**
 * Компонент переключателя режима редактирования рейса.
 *
 * @author Markitanov Vadim
 * @since 08.01.2025
 */
import React, { JSX } from 'react'
import { Switch } from 'antd'
import { LocalStoreKey, LocalStoreValue } from '../../../store/style'

interface FlightEditorModeSwitcherProps {
	callback?: (value: boolean) => void
}

const FlightEditorModeSwitcher = ({ callback }: FlightEditorModeSwitcherProps): JSX.Element => {
	const changeHandler = (value: boolean) => {
		if (value) {
			localStorage.setItem(LocalStoreKey.FLIGHT_EDIT_MODE, LocalStoreValue.FLIGHT_EDIT_MODE)
		} else {
			localStorage.removeItem(LocalStoreKey.FLIGHT_EDIT_MODE)
		}

		if (callback !== undefined) {
			callback(value)
		}
	}

	return (
		<Switch
			className={'monochromatic-switch'}
			checkedChildren={'Select'}
			unCheckedChildren={'Modal'}
			onChange={changeHandler}
			defaultChecked={!!localStorage.getItem(LocalStoreKey.FLIGHT_EDIT_MODE)}
		/>
	)
}

export default FlightEditorModeSwitcher
