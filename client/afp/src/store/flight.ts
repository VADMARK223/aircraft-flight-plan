/**
 * Хранилище рейсов.
 *
 * @author Markitanov Vadim
 * @since 04.12.2023
 */

import { Flight } from '../models/Flight'
import { createEffect } from 'effector/compat'
import { createEvent, createStore, sample } from 'effector'
import { $routeSelected, routeAddOrSaveFx, routeDeleteFx, flightSelectReset, RouteAddOrSaveParams } from './route'
import { toast } from 'react-toastify'
import { getBoardIndexByBoardId } from '../utils/board'
import { flightsDefault, LOCAL_MODE } from '../utils/consts'
import {
	requestAddFlightFx,
	fetchFlightsFx,
	requestDeleteAllFlightsFx,
	requestDeleteFlightFx,
	requestSaveFlightFx
} from '../api/flight'

export const $flights = createStore<Flight[]>(LOCAL_MODE ? flightsDefault : [])
export const $flightSelected = createStore<Flight | null>(null)
$flights.watch((boards: Flight[]) => {
	if (!boards.length) {
		flightSelectReset()
	}

	const routeSelect = $routeSelected.getState()
	if (routeSelect) {
		let find = false
		for (let i = 0; i < boards.length; i++) {
			if (boards[i].routes.indexOf(routeSelect) !== -1) {
				find = true
				break
			}
		}
		if (!find) {
			flightSelectReset()
		}
	}

	const flightSelect = $flightSelected.getState()
	if (flightSelect !== null) {
		const isBoardSelectInBoards = boards.find(value => flightSelect.id === value.id)
		if (isBoardSelectInBoards === undefined) {
			boardSelectResetFx()
		}
	}
})

export const flightAddFx = createEffect<Flight, Flight[]>()
export const flightsDeleteAllFx = createEffect<void, Flight[]>('Удаление всех рейсов.')
export const flightSaveFx = createEffect<Flight, Flight[]>()
export const flightDeleteFx = createEffect<number | null, Flight[]>()

$flights.on(fetchFlightsFx.doneData, (_, payload) => payload)
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
	if (findBoardIndex === -1) {

	} else {
		return [...boards.slice(0, findBoardIndex), ...boards.slice(findBoardIndex + 1)]
	}
})
$flights.on(flightsDeleteAllFx, _ => [])
$flights.on(routeAddOrSaveFx, (flights, params: RouteAddOrSaveParams) => {
	const { route, oldFlightId } = params
	if (route.id === -1) { // Добавление перелета
		const flight = flights.find(value => value.id === route.flightId)
		if (flight === undefined) {
			return flights
		}

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
$flights.on(routeDeleteFx, (flights, route) => {
	const routeId = route.id
	let findBoardIndex = -1, findFlightIndex = -1, stopFind = false
	for (let i = 0; i < flights.length; i++) {
		if (stopFind) {
			break
		}
		const board = flights[i]
		for (let j = 0; j < board.routes.length; j++) {
			const flight = board.routes[j]
			stopFind = flight.id === routeId
			if (stopFind) {
				findBoardIndex = flights.indexOf(board)
				findFlightIndex = board.routes.indexOf(flight)
				break
			}
		}
	}

	const newFlights = [...flights]
	const newRoutes = [...flights[findBoardIndex].routes]
	newFlights[findBoardIndex].routes = [...newRoutes.slice(0, findFlightIndex), ...newRoutes.slice(findFlightIndex + 1)]
	return newFlights
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
export const boardSelectResetFx = createEvent()
$flightSelected.reset(boardSelectResetFx)
