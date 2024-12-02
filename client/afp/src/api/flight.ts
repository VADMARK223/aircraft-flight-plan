import { createEffect } from 'effector/compat'
import { Flight } from '../models/Flight'
import { apiPost, apiGet } from './common'

/**
 * @author Markitanov Vadim
 * @since 28.11.2024
 */

export const fetchFlightsFx = createEffect<void, Flight[]>(async () => {
	return await apiGet('flight/get_all_flights')
})

export const requestAddFlightFx = createEffect<number, Flight | null>(async (contractId: number) => {
	return await apiPost<Flight>('flight/add', {
		json: contractId
	})
})

export const requestDeleteAllFlightsFx = createEffect<void, boolean | null>(async () => {
	return await apiPost<boolean>('flight/delete_all_flights')
})


