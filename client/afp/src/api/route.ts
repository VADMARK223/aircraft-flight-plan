import { createEffect } from 'effector/effector.umd'
import { Route } from '../models/Route'
import { apiPost } from './common'

/**
 * API для работы с перелетами.
 * @author Markitanov Vadim
 * @since 08.12.2024
 */

const mapper = require('object-mapper')

export const requestAddOrSaveRouteFx = createEffect<Route, void>(async (route: Route) => {
	const mappingResult = mapper(route, map)
	return await apiPost<void>('route/add_or_save_route', {
		json: mappingResult
	})
})

const map = {
	'id': 'routeId',
	'aptDepartId': 'airportDepartureId',
	'aptArrId': 'airportArrivalId',
	'scheduledDepartureDate': 'scheduledDepartureDate',
	'scheduledArrivalDate': 'scheduledArrivalDate',
	'routeTypeId': 'routeTypeId'
}
