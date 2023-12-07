import { createStore } from 'effector'
import { createEffect } from 'effector/compat'

/**
 * @author Markitanov Vadim
 * @since 06.12.2023
 */

export const THEME_LOCAL_STORAGE_KEY: string = 'aircraft_flight_plan_theme'
export const THEME_LOCAL_STORAGE_VALUE: string = 'dark'

export interface StyleStore {
	isDarkTheme: boolean
	backgroundColor: string,
	textColor: string
	lineColor: string
	contextMenuBackgroundColor: string
	contextMenuLineColor:string
}

const defaultStyleStore: StyleStore = {
	isDarkTheme: localStorage.getItem(THEME_LOCAL_STORAGE_KEY) === THEME_LOCAL_STORAGE_VALUE,
	backgroundColor: '',
	textColor: '',
	lineColor: '',
	contextMenuBackgroundColor: '',
	contextMenuLineColor:''
}

export const setDarkThemeFx = createEffect<boolean, StyleStore>()
export const setBackgroundColorFx = createEffect<string, StyleStore>()
export const setTextColorFx = createEffect<string, StyleStore>()
export const setLineColorFx = createEffect<string, StyleStore>()
export const setContextMenuBackgroundColorFx = createEffect<string, StyleStore>()
export const setContextMenuLineColorFx = createEffect<string, StyleStore>()
export const $style = createStore<StyleStore>(defaultStyleStore)
	.on(setDarkThemeFx, (state, payload) => {
		return { ...state, isDarkTheme: payload }
	})
	.on(setBackgroundColorFx, (state, payload) => {
		return { ...state, backgroundColor: payload }
	}).on(setTextColorFx, (state, payload) => {
		return { ...state, textColor: payload }
	}).on(setLineColorFx, (state, payload) => {
		return { ...state, lineColor: payload }
	}).on(setContextMenuBackgroundColorFx, (state, payload) => {
		return { ...state, contextMenuBackgroundColor: payload }
	}).on(setContextMenuLineColorFx, (state, payload) => {
		return { ...state, contextMenuLineColor: payload }
	})