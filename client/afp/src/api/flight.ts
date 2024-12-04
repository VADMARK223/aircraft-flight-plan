import { createEffect } from 'effector/compat'
import { Flight } from '../models/Flight'
import { apiPost, apiGet, showSuccess } from './common'
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

export const requestDeleteFlightFx = createEffect<number, number | null>(async (flightId: number) => {
	return await apiPost<number>('flight/delete_flight', {
		json: flightId
	})
})

export const requestSaveFlightFx = createEffect<Flight, Flight>(async (flight: Flight) => {
	const response: Flight = await apiPost<Flight>('flight/save_flight', {
		json: flight
	})

	showSuccess(`Рейс ${response.id} успешно изменен.`)

	setTimeout(()=>{
		window.location.reload()
	}, 1000)

	return response
})

/*export const requestSaveFlightFx = createEffect<Flight, Flight>(async (flight: Flight) => {
	const response: Flight = await apiPost<Flight>('flight/save_flight', {
		json: flight
	})

	const resultParse = FlightsSchema.safeParse(response)
	if (!resultParse.success) {
		throw new Error('Ошибка валидации рейса!')
	}
	const parsedFlight: Flight = resultParse.data as unknown as Flight

	showSuccess(`Рейс ${parsedFlight.id} успешно изменен.`)
	return parsedFlight
})*/

export const requestDeleteAllFlightsFx = createEffect<void, boolean | null>(async () => {
	return await apiPost<boolean>('flight/delete_all_flights')
})



