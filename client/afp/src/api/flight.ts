import { createEffect } from 'effector/compat'
import { Flight } from '../models/Flight'
import { apiPost, apiGet, showSuccess, showError } from './common'
import { FlightsSchema, FlightSchema } from '../models/zodSchemas'
import { flightSelectFx } from '../store/flight'

/**
 * API для работы с рейсами.
 *
 * @author Markitanov Vadim
 * @since 28.11.2024
 */
export const fetchFlightsFx = createEffect<void, Flight[]>(async () => {
	const flightsFromServer = await apiGet<Flight[]>('flight/get_flights')
	const resultSafeParse = FlightsSchema.safeParse(flightsFromServer)
	if (!resultSafeParse.success) {
		return []
	}

	return resultSafeParse.data as unknown as Flight[]
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

export const requestSaveFlightFx = createEffect<Flight, Flight | null>(async (flight: Flight) => {
	const response: Flight = await apiPost<Flight>('flight/save_flight', {
		json: flight
	})

	const resultParse = FlightSchema.safeParse(response)
	if (!resultParse.success) {
		showError('Ошибка валидации рейса.')
		console.log(`Ошибка валидации рейса: ${resultParse.error}`)
		return null
	}
	const parsedFlight: Flight = resultParse.data as unknown as Flight

	showSuccess(`Рейс "${response.id}" успешно изменен.`)

	flightSelectFx(parsedFlight)

	return parsedFlight
})

export const requestDeleteAllFlightsFx = createEffect<void, boolean | null>(async () => {
	return await apiPost<boolean>('flight/delete_all_flights')
})



