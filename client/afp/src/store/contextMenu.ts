import { Flight } from '../models/Flight'
import { createEvent, createStore } from 'effector'
import { createEffect } from 'effector/compat'
import { Board } from '../models/Board'

/**
 * @author Markitanov Vadim
 * @since 07.12.2023
 */

export interface ContextMenuModel {
	x: number
	y: number
	data: Flight | Board
	isFlight: boolean
}

export const setContextMenuFx = createEffect<ContextMenuModel | null, ContextMenuModel | null>()
export const resetContextMenuFx = createEvent()

export const $contextMenu = createStore<ContextMenuModel | null>(null)
	.on(setContextMenuFx, (state, payload) => payload)
	.reset(resetContextMenuFx)