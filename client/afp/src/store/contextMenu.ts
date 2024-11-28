import { Route } from '../models/Route'
import { createEvent, createStore } from 'effector'
import { createEffect } from 'effector/compat'
import { Flight } from '../models/Flight'

/**
 * @author Markitanov Vadim
 * @since 07.12.2023
 */

export interface ContextMenuModel {
	x: number
	y: number
	data: Route | Flight
	isFlight: boolean
}

export const setContextMenuFx = createEffect<ContextMenuModel | null, ContextMenuModel | null>()
export const resetContextMenuFx = createEvent()

export const $contextMenu = createStore<ContextMenuModel | null>(null)
	.on(setContextMenuFx, (state, payload) => payload)
	.reset(resetContextMenuFx)
