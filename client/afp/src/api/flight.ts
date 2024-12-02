import { createEffect } from 'effector/compat'
import { Flight } from '../models/Flight'
import { commonApi, apiPost } from './common'
import { FlightDto } from '../models/dto/FlightDto'

/**
 * @author Markitanov Vadim
 * @since 28.11.2024
 */
export const requestAddFlightFx = createEffect<number, Flight | null>(async (contractId: number) => {
	const data: Flight = await apiPost<Flight>('flight/add', {
		json: contractId
	})
	console.log('DATA:', data)
	return data
})

export const fetchFlightsFx = createEffect<void, FlightDto | null>(async () => {
	try {
		return await commonApi.get('flight/get_all_flights').json<FlightDto>()
	} catch (error: any) {
		console.log('Error', error)
		return null
	}
})
