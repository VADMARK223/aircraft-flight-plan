import { createEffect } from 'effector/compat'
import { Flight } from '../models/Flight'
import { commonApi, apiGet } from './common'
import { FlightDto } from '../models/dto/FlightDto'

/**
 * @author Markitanov Vadim
 * @since 28.11.2024
 */
export const requestAddFlightFx = createEffect<void, Flight | null>(async () => {
	try {
		const data = await commonApi.get('flight/add').json<Flight>()
		console.log('DATA:', data)
		return data
	} catch (error: any) {
		console.log('Error', error)
		return null
	}
})

export async function testFetch () {
	console.log('testFetch:')
	try {
		// @ts-ignore
		const data: Flight = await apiGet<Flight>('flight/add')//await commonApi.get('flight/add');
		// const data = await commonApi.get('flight/add')
		console.log('>>>>',data)
	} catch (error) {
		console.error(error)
	}
}

export const fetchFlightsFx = createEffect<void, FlightDto | null>(async () => {
	try {
		return await commonApi.get('flight/get_all_flights').json<FlightDto>()
	} catch (error: any) {
		console.log('Error', error)
		return null
	}
})
