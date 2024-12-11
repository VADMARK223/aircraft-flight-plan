import { createEffect } from 'effector/compat'
import { Flight, FlightSchema, FlightsSchema } from '../models/Flight'
import { apiPost, apiGet, showSuccess, showError } from './common'
import { flightSelectFx } from '../store/flight'

/**
 * API для работы с рейсами.
 *
 * @author Markitanov Vadim
 * @since 28.11.2024
 */
export const fetchFlightsFx = createEffect<void, Flight[]>(async () => {
	const flightsFromServer: Flight[] = await apiGet<Flight[]>('flight/get_flights')
	return safeParseFlights(flightsFromServer)
})

export const safeParseFlights = (flightsFromServer: Flight[]): Flight[] => {
	const resultSafeParse = FlightsSchema.safeParse(flightsFromServer)
	if (!resultSafeParse.success) {
		showError('Ошибка валидации рейсов.')
		console.error(`Ошибка валидации рейсов: ${resultSafeParse.error}`)
		return []
	}

	return resultSafeParse.data
}

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
		console.error(`Ошибка валидации рейса: ${resultParse.error}`)
		return null
	}
	const parsedFlight: Flight = resultParse.data

	showSuccess(`Рейс "${response.id}" успешно изменен.`)

	flightSelectFx(parsedFlight)

	return parsedFlight
})

export const requestDeleteAllFlightsFx = createEffect<void, boolean | null>(async () => {
	return await apiPost<boolean>('flight/delete_all_flights')
})



