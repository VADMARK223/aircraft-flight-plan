import { createStore, createEvent } from 'effector'
import { LocalStoreKey, LocalStoreValue } from '../utils/localStorage'

/**
 * @author Markitanov Vadim
 * @since 06.12.2023
 */
export interface StyleStore {
	isDarkTheme: boolean
	backgroundColor: string,
	textColor: string
	lineColor: string
	contextMenuBackgroundColor: string
	contextMenuLineColor: string
}

const defaultStyleStore: StyleStore = {
	isDarkTheme: localStorage.getItem(LocalStoreKey.THEME) === LocalStoreValue.THEME,
	backgroundColor: '',
	textColor: '',
	lineColor: '',
	contextMenuBackgroundColor: '',
	contextMenuLineColor: ''
}

export const setDarkTheme = createEvent<boolean>('Событие включение темной темы.')
export const setBackgroundColor = createEvent<string>('Событие изменения цвета фона приложения.')
export const setTextColor = createEvent<string>('Событие изменения цвета.')
export const setLineColor = createEvent<string>('Событие изменения цвета линий.')
export const setContextMenuBackgroundColor = createEvent<string>()
export const setContextMenuLineColor = createEvent<string>()

export const $style = createStore<StyleStore>(defaultStyleStore)
$style.on(setDarkTheme, (state, payload) => ({ ...state, isDarkTheme: payload }))
$style.on(setBackgroundColor, (state, payload) => ({ ...state, backgroundColor: payload }))
$style.on(setTextColor, (state, payload) => ({ ...state, textColor: payload }))
$style.on(setLineColor, (state, payload) => ({ ...state, lineColor: payload }))
$style.on(setContextMenuBackgroundColor, (state, payload) => ({ ...state, contextMenuBackgroundColor: payload }))
$style.on(setContextMenuLineColor, (state, payload) => ({ ...state, contextMenuLineColor: payload }))
