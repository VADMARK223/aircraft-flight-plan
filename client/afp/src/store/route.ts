import { createEvent, createStore, sample } from 'effector'
import { Route } from '../models/Route'
import { createEffect } from 'effector/compat'
import { Flight } from '../models/Flight'

/**
 * Хранилище перелетов.
 *
 * @author Markitanov Vadim
 * @since 04.12.2023
 */

export const routeSelectFx = createEffect<Route, Route>('Событие принудительного выбора перелета')
export const routeClickFx = createEffect<Route, Route>('Событие клика по перелету')
export const flightSelectReset = createEvent()
export const flightBoardIdChanged = createEvent<number>('Событие смены рейса у перелета.')
export const $routeSelected = createStore<Route | null>(null)
	.on(routeClickFx, (state, payload) => {
		if (state?.id === payload.id) {
			return null
		}
		return payload
	})
	.on(routeSelectFx, (_state, payload) => payload)
	.reset(flightSelectReset)

export const routeAddFx = createEffect<Route, Flight[]>()
export const routeDeleteFx = createEffect<Route, Flight[]>()

sample({
	source: routeDeleteFx,
	clock: flightBoardIdChanged,
	fn: (route: Route, flightId: number) => {
		route.flightId = flightId
		return route
	},
	target: routeAddFx
})
