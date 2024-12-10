import { createEffect } from 'effector/effector.umd'
import { Route } from '../models/Route'
import { apiPost, showError } from './common'
import { RouteAddOrSaveParams } from '../store/route'
import { RouteSchema } from '../models/zodSchemas'

/**
 * API для работы с перелетами.
 * @author Markitanov Vadim
 * @since 08.12.2024
 */

const mapper = require('object-mapper')

export const requestAddOrSaveRouteFx = createEffect<Route, RouteAddOrSaveParams | null>(async (route: Route) => {
	const mapped = mapper(route, mapObject)

	const response = await apiPost<Route>('route/add_or_save_route', {
		json: mapped
	})
	console.log('response:', response)

	const safeParse = RouteSchema.safeParse(response)
	if (!safeParse.success) {
		showError(`Ошибка валидации перелета.`)
		console.log(`Ошибка валидации перелета: ${safeParse.error}`)
		return null
	}

	const validated: Route = safeParse.data as unknown as Route
	console.log('validated:', validated)

	const result: RouteAddOrSaveParams = { route: validated }
	return result
})

const mapObject = {
	'id': 'id',
	'airportDepartureId': 'airportDepartureId',
	'aptArrId': 'airportArrivalId',
	'scheduledDepartureDate': 'scheduledDepartureDate',
	'scheduledArrivalDate': 'scheduledArrivalDate',
	'routeTypeId': 'routeTypeId',
	'flightId': 'flightId'
}
