import { createEffect } from 'effector/effector.umd'
import { Route } from '../models/Route'
import { apiPost } from './common'
import { Flight, FlightsSchema } from '../models/Flight'

/**
 * API для работы с перелетами.
 * @author Markitanov Vadim
 * @since 08.12.2024
 */

const mapper = require('object-mapper')

export const requestAddOrSaveRouteFx = createEffect<Route, Flight[]>(async (route: Route) => {
	const mapped = mapper(route, mapObject)

	const response = await apiPost<Route>('route/add_or_save_route', {
		json: mapped
	})

	const resultSafeParse = FlightsSchema.safeParse(response)
	if (!resultSafeParse.success) {
		return []
	}

	return resultSafeParse.data as unknown as Flight[]
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

export const requestDeleteRouteFx = createEffect<number, Flight[]>(async (routeId: number) => {
	const flightsFromServer =  await apiPost<Flight[]>('route/delete_route', {
		json: routeId
	})

	const resultSafeParse = FlightsSchema.safeParse(flightsFromServer)
	if (!resultSafeParse.success) {
		return []
	}

	return resultSafeParse.data as unknown as Flight[]
})
