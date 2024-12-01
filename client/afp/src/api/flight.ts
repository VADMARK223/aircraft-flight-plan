import { createEffect } from 'effector/compat'
import { Flight } from '../models/Flight'
import { commonApi } from './common'
import { FlightDto } from '../models/dto/FlightDto'

/**
 * @author Markitanov Vadim
 * @since 28.11.2024
 */
export const requestAddFlightFx = createEffect<void, Flight | null>(async () => {
	try {
		return await commonApi.get('flight/add').json<Flight>()
	} catch (error: any) {
		console.log('Error', error)
		return null
	}
})

export const fetchFlightsFx = createEffect<void, FlightDto | null>(async () => {
	try {
		return await commonApi.get('flight/get_all_flights').json<FlightDto>()
	} catch (error: any) {
		console.log('Error', error)
		return null
	}
})
