import { createEvent, createStore } from 'effector'
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
export const routeSelectReset = createEvent('Событие сброса выбранного перелета.')

export const $routeSelected = createStore<Route | null>(null)
	.on(routeClickFx, (state, payload) => {
		if (state?.id === payload.id) {
			return null
		}
		return payload
	})
	.on(routeSelectFx, (_state, payload) => payload)
	.reset(routeSelectReset)

export type RouteAddOrSaveParams = {
	route: Route,
	oldFlightId?: number
}
export const routeAddOrSaveFx = createEffect<RouteAddOrSaveParams, Flight[]>()
export const routeDeleteFx = createEffect<Route, Flight[]>()

// $routeSelected.watch((state) => {
// 	console.log('Route selected:', state)
// 	console.trace('Trace')
// })
