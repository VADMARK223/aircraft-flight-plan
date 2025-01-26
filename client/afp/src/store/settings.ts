import { createStore, createEvent } from 'effector'
import { LocalStoreKey } from '../utils/localStorage'

/**
 * @author Markitanov Vadim
 * @since 26.01.2025
 */
interface Settings {
	showDates: boolean
	flightEditMode:boolean
}

const defaultStore: Settings = {
	showDates: localStorage.getItem(LocalStoreKey.DATE_VISIBILITY) != null,
	flightEditMode: localStorage.getItem(LocalStoreKey.FLIGHT_EDIT_MODE) != null,
}

export const $settings = createStore<Settings>(defaultStore)
export const showDatesChanged = createEvent<boolean>('Событие изменения настройки показа дат на канве.')
export const flightEditModeChanged = createEvent<boolean>('Событие изменения настройки режима редактирования рейса.')

$settings.on(showDatesChanged, (state, payload) => {
	return { ...state, showDates: payload }
})

$settings.on(flightEditModeChanged, (state, payload) => {
	return { ...state, flightEditMode: payload }
})
