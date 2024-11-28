import { createEvent, createStore, sample } from 'effector'
import { Route } from '../models/Route'
import { createEffect } from 'effector/compat'
import { Flight } from '../models/Flight'

/**
 * Хранилище полётов.
 *
 * @author Markitanov Vadim
 * @since 04.12.2023
 */

export const flightSelectFx = createEffect<Route, Route>('Событие пренудительного выбора полета')
export const flightClickFx = createEffect<Route, Route>('Событие клика по полету')
export const flightSelectReset = createEvent()
export const flightBoardIdChanged = createEvent<number>('Событие смены борта у полета.')
export const $flightsSelect = createStore<Route | null>(null)
	.on(flightClickFx, (state, payload) => {
		if (state?.id === payload.id) {
			return null
		}
		return payload
	})
	.on(flightSelectFx, (state, payload) => payload)
	.reset(flightSelectReset)

export const flightAddFx = createEffect<Route, Flight[]>()
export const flightDeleteFx = createEffect<Route, Flight[]>()

sample({
	source: flightDeleteFx,
	clock: flightBoardIdChanged,
	fn: (flight: Route, boardId: number) => {
		flight.boardId = boardId
		return flight
	},
	target: flightAddFx
})
