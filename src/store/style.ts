import { createStore } from 'effector'
import { createEffect } from 'effector/compat'

/**
 * @author Markitanov Vadim
 * @since 06.12.2023
 */

interface StyleStore {
	isDarkTheme: boolean
	backgroundColor: string,
	textColor: string
	lineColor: string
}

const defaultStyleStore: StyleStore = {
	isDarkTheme: false,
	backgroundColor: '',
	textColor: '',
	lineColor: ''
}

export const setDarkThemeFx = createEffect<boolean, StyleStore>()
export const setBackgroundColorFx = createEffect<string, StyleStore>()
export const setTextColorFx = createEffect<string, StyleStore>()
export const setLineColorFx = createEffect<string, StyleStore>()
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
	})