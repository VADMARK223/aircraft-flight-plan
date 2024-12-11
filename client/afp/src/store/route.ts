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
export const routeSelectUpdateFlightId = createEffect<number, Route | null>('Эффект изменения рейса у полета')

export const $routeSelected = createStore<Route | null>(null)
	.on(routeClickFx, (state, payload) => {
		if (state?.id === payload.id) {
			return null
		}
		return payload
	})
	.on(routeSelectFx, (_state, payload) => payload)
	.on(routeSelectUpdateFlightId, (state, payload) => {
		if (state === null) {
			return null
		}

		return { ...state, flightId: payload }
	})
	.reset(routeSelectReset)

export type RouteAddOrSaveParams = {
	route: Route,
	oldFlightId?: number
}
export const routeAddOrSaveFx = createEffect<RouteAddOrSaveParams, Flight[]>()
export const routeDeleteFx = createEffect<Route, Flight[]>()

routeDeleteFx.watch(() => {
	routeSelectReset()
})

// sample({
// 	source: requestAddOrSaveRouteFx.doneData,
// 	filter: (params: RouteAddOrSaveParams | null): params is RouteAddOrSaveParams => params != null,
// 	target: routeAddOrSaveFx
// })
