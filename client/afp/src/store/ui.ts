import { createStore } from 'effector'
import { createEffect } from 'effector/compat'

/**
 * @author Markitanov Vadim
 * @since 09.12.2023
 */
interface Ui {
	x: number
	y: number
	width: number
	height: number
}

const defaultStore: Ui = {
	x: 0,
	y: 0,
	width: 300,
	height: 300
}

export const $ui = createStore<Ui>(defaultStore)
export const updatePosFx = createEffect<{ x: number, y: number }, Ui>()
$ui.on(updatePosFx, (state, payload) => {
	return { ...state, x: payload.x, y: payload.y }
})
