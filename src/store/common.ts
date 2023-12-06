import { createStore } from 'effector'
import { createEffect } from 'effector/compat'

/**
 * @author Markitanov Vadim
 * @since 06.12.2023
 */

interface CommonStore {
	isDarkTheme: boolean
}

const defaultCommonStore: CommonStore = {
	isDarkTheme: true
}

export const setDarkThemeFx = createEffect<boolean, CommonStore>()
export const $common = createStore<CommonStore>(defaultCommonStore)
	.on(setDarkThemeFx, (state, payload) => {
		return { ...state, isDarkTheme: payload }
	})