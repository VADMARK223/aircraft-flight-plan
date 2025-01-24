import { createEffect } from 'effector/compat'
import { Flight, FlightSchema, FlightsSchema } from '../models/Flight'
import { apiPost, apiGet, showSuccess, showError, showWarn } from './common'
import { DictData } from '../models/DictData'

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

export const requestAddFlightFx = createEffect<DictData, Flight | null>(async (contract: DictData) => {
	const response: Flight = await apiPost<Flight>('flight/add_flight', {
		json: contract
	})

	showSuccess(`New flight with reg. number: '${response.contract.label}' added.`)

	return response
})

export const requestDeleteFlightFx = createEffect<number, number | null>(async (flightId: number) => {
	const response: number = await apiPost<number>('flight/delete_flight', {
		json: flightId
	})
	showWarn(`Flight: '${response}' has been removed.`)
	return response
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

	showSuccess(`У рейса: '${parsedFlight.id}' теперь контракт: '${parsedFlight.contract.value}'.`)

	return parsedFlight
})

export const requestDeleteAllFlightsFx = createEffect<void, boolean | null>(async () => {
	return await apiPost<boolean>('flight/delete_all_flights')
})



