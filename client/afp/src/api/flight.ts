import { createEffect } from 'effector/compat'
import { Flight } from '../models/Flight'
import { apiPost, apiGet } from './common'
import { FlightsSchema } from '../models/zodSchemas'

/**
 * @author Markitanov Vadim
 * @since 28.11.2024
 */

export const fetchFlightsFx = createEffect<void, Flight[]>(async () => {
	const flightsFromServer = await apiGet<Flight[]>('flight/get_all_flights')
	const resultSafeParse = FlightsSchema.safeParse(flightsFromServer)
	if (!resultSafeParse.success) {
		return []
	}

	return resultSafeParse.data as Flight[]
})

export const requestAddFlightFx = createEffect<number, Flight | null>(async (contractId: number) => {
	return await apiPost<Flight>('flight/add_flight', {
		json: contractId
	})
})

export const requestDeleteAllFlightsFx = createEffect<void, boolean | null>(async () => {
	return await apiPost<boolean>('flight/delete_all_flights')
})


