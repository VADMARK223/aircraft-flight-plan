/**
 * Хранилище рейсов.
 *
 * @author Markitanov Vadim
 * @since 04.12.2023
 */

import { Flight } from '../models/Flight'
import { createEffect } from 'effector/compat'
import { createEvent, createStore, sample } from 'effector'
import { $routeSelected, routeAddOrSaveFx, routeSelectReset, RouteAddOrSaveParams } from './route'
import { toast } from 'react-toastify'
import { getBoardIndexByBoardId } from '../utils/board'
import {
	requestAddFlightFx,
	fetchFlightsFx,
	requestDeleteAllFlightsFx,
	requestDeleteFlightFx,
	requestSaveFlightFx
} from '../api/flight'
import { Route } from '../models/Route'
import { requestAddOrSaveRouteFx, requestDeleteRouteFx } from '../api/route'

export const $flights = createStore<Flight[]>([])
export const $flightSelected = createStore<Flight | null>(null)
$flights.watch((flights: Flight[]) => {
	if (!flights.length) {
		routeSelectReset()
	}

	const routeSelect: Route | null = $routeSelected.getState()
	if (routeSelect) {
		let find = false
		outerLoop:
			for (let i = 0; i < flights.length; i++) {
				const flight = flights[i]

				for (let j = 0; j < flight.routes.length; i++) {
					const route = flight.routes[j]
					if (route.flightId === flight.id) {
						find = true
						break outerLoop
					}
				}
			}
		if (!find) {
			routeSelectReset()
		}
	}

	const flightSelect = $flightSelected.getState()
	if (flightSelect !== null) {
		const isBoardSelectInBoards = flights.find(flight => flightSelect.id === flight.id)
		if (isBoardSelectInBoards === undefined) {
			flightSelectResetFx()
		}
	}
})

export const flightAddFx = createEffect<Flight, Flight[]>()
export const flightsDeleteAllFx = createEffect<void, Flight[]>('Удаление всех рейсов.')
export const flightSaveFx = createEffect<Flight, Flight[]>()
export const flightDeleteFx = createEffect<number | null, Flight[]>()

$flights.on(fetchFlightsFx.doneData, (_, payload) => payload)
$flights.on(requestAddOrSaveRouteFx.doneData, (_, payload) => payload)
$flights.on(requestDeleteRouteFx.doneData, (_, payload) => payload)

sample({
	source: requestAddFlightFx.doneData,
	filter: (payload): payload is Flight => payload != null,
	target: flightAddFx
})
sample({
	source: requestDeleteFlightFx.doneData,
	target: flightDeleteFx
})
sample({
	source: requestDeleteAllFlightsFx.doneData,
	target: flightsDeleteAllFx
})

sample({
	source: requestSaveFlightFx.doneData,
	filter: (payload): payload is Flight => payload != null,
	target: flightSaveFx
})

$flights.on(flightAddFx, (boards: Flight[], newBoard: Flight) => {
	if (newBoard.id === -1) {
		let maxId = boards.length ? Math.max(...boards.map(value => value.id)) : 0
		newBoard.id = ++maxId
	}

	return [...boards, newBoard]
})
$flights.on(flightSaveFx, (flights, flight) => {
	const findBoardIndex = getBoardIndexByBoardId(flights, flight.id)
	if (findBoardIndex === -1) {
		toast.warn(`Ошибка редактирования рейса: ${flight.id}`)
	} else {
		const newBoards = [...flights]
		newBoards[findBoardIndex] = flight
		return newBoards
	}
})
$flights.on(flightDeleteFx, (boards, flightId) => {
	const findBoardIndex = getBoardIndexByBoardId(boards, flightId)
	if (findBoardIndex !== -1) {
		return [...boards.slice(0, findBoardIndex), ...boards.slice(findBoardIndex + 1)]
	}
})
$flights.on(flightsDeleteAllFx, () => [])
$flights.on(routeAddOrSaveFx, (flights, params: RouteAddOrSaveParams) => {
	const { route, oldFlightId } = params
	if (route.id == null) {// Добавление перелета
		const flight = flights.find(value => value.id === route.flightId)
		if (flight === undefined) {
			return flights
		}

		route.id = getMaxRouteId(flights) + 1
		flight.routes = [...flight.routes, route]
		const newFlights = [...flights]
		newFlights[flights.indexOf(flight)] = flight
		return newFlights
	} else { // Редактирование перелета
		let result
		if (route.flightId === oldFlightId) { // Рейс не поменялся у перелета
			const flight = flights.find(value => value.id === route.flightId)
			if (flight === undefined) {
				throw new Error(`При редактировании рейс ${route.flightId} не найден.`)
			}

			const routeIndex = flight.routes.findIndex(value => {
				return oldFlightId === value.flightId
			})

			flight.routes[routeIndex] = route
			result = [...flights]
		} else { // Рейс поменялся у перелета
			result = flights.map(flight => {
				// Если это старый рейс, удаляем перелет из его массива
				if (flight.id === oldFlightId) {
					return {
						...flight,
						routes: flight.routes.filter(r => r.id !== route.id)
					}
				}

				// Если это новый рейс, добавляем перелет в его массив
				if (flight.id === route.flightId) {
					return {
						...flight,
						routes: [...flight.routes, route]
					}
				}

				// Если это не старый и не новый рейс, возвращаем его как есть
				return flight
			})
		}
		return result
	}
})

export const flightClickFx = createEffect<Flight, Flight>('Событие клика по рейсу')
export const flightSelectFx = createEffect<Flight, Flight>('Событие принудительного выбора рейса')
$flightSelected
	.on(flightSelectFx, (_state, payload) => payload)
	.on(flightClickFx, (flight, clickedFlight) => {
		if (flight?.id === clickedFlight.id) {
			return null
		}
		return clickedFlight
	})

export const flightsSelectAdded = createEffect<Flight, Flight[]>('Добавление рейса в выбранные.')
export const flightsSelectReplaced = createEffect<Flight, Flight[]>('Замена выбранного рейса..')
export const $flightsSelected = createStore<Flight[]>([])
$flightsSelected.on(flightsSelectAdded, (state, payload) => [...state, payload])
$flightsSelected.on(flightsSelectReplaced, (_state, payload) => [payload])
export const flightsSelectReset = createEvent('Событие сброса выбранных рейсов.')
$flightsSelected.reset(flightsSelectReset)

export const flightSelectResetFx = createEvent('Событие сброса выбранного рейса.')
$flightSelected.reset(flightSelectResetFx)

const getMaxRouteId = (flights: Flight[]): number => {
	return flights.reduce((maxId, flight) => {
		// Обойти routes текущего flight и найти максимальный id
		const flightMax = flight.routes.reduce(
			(max, route) => Math.max(max, route.id as number),
			-Infinity // Начальное значение
		)
		return Math.max(maxId, flightMax) // обновить общий максимум
	}, -Infinity)
}

requestSaveFlightFx.doneData.watch(() => {
	console.log('AFTER SAVE')
	flightSelectResetFx()
})
