import { createStore, createEvent } from 'effector'
import { LocalStoreKey } from '../utils/localStorage'

/**
 * @author Markitanov Vadim
 * @since 26.01.2025
 */
interface Settings {
	showDates: boolean
}

const defaultStore: Settings = {
	showDates: localStorage.getItem(LocalStoreKey.DATE_VISIBILITY) != null
}

export const $settings = createStore<Settings>(defaultStore)
export const showDatesChanged = createEvent<boolean>('Событие изменения настройки показа дат на канве.')
$settings.on(showDatesChanged, (state, payload) => {
	return { ...state, showDates: payload }
})
