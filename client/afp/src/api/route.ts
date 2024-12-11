import { createEffect } from 'effector/effector.umd'
import { Route } from '../models/Route'
import { apiPost } from './common'
import { Flight } from '../models/Flight'
import { safeParseFlights } from './flight'

/**
 * API для работы с перелетами.
 * @author Markitanov Vadim
 * @since 08.12.2024
 */
export const requestAddOrSaveRouteFx = createEffect<Route, Flight[]>(async (route: Route) => {
	const flightsFromServer: Flight[] = await apiPost<Flight[]>('route/add_or_save_route', {
		json: route
	})
	return safeParseFlights(flightsFromServer)
})


export const requestDeleteRouteFx = createEffect<number, Flight[]>(async (routeId: number) => {
	const flightsFromServer = await apiPost<Flight[]>('route/delete_route', {
		json: routeId
	})
	return safeParseFlights(flightsFromServer)
})
