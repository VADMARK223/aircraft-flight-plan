import { createEffect } from 'effector/compat'
import { Flight } from '../models/Flight'
import { apiPost, apiGet, showError } from './common'
import { FlightsSchema } from '../models/zodSchemas'

/**
 * @author Markitanov Vadim
 * @since 28.11.2024
 */

export const fetchFlightsFx = createEffect<void, Flight[]>(async () => {
	const flightsFromServer = await apiGet<Flight[]>('flight/get_all_flights')
	console.log('flightsFromServer:', flightsFromServer)
	const resultSafeParse = FlightsSchema.safeParse(flightsFromServer)
	if (!resultSafeParse.success) {
		showError(`Ошибка валидации рейсов.`)
		return []
	}

	const flights = resultSafeParse.data
	console.log('flights:', flights)
	return flights as Flight[]
})

export const requestAddFlightFx = createEffect<number, Flight | null>(async (contractId: number) => {
	return await apiPost<Flight>('flight/add', {
		json: contractId
	})
})

export const requestDeleteAllFlightsFx = createEffect<void, boolean | null>(async () => {
	return await apiPost<boolean>('flight/delete_all_flights')
})


