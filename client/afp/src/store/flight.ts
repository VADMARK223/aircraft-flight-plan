/**
 * Хранилище рейсов.
 *
 * @author Markitanov Vadim
 * @since 04.12.2023
 */

import { Flight } from '../models/Flight'
import { createEffect } from 'effector/compat'
import { Route } from '../models/Route'
import { createEvent, createStore, sample } from 'effector'
import { $routeSelect, routeAddFx, routeDeleteFx, flightSelectReset } from './route'
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
export const $selectedFlight = createStore<Flight | null>(null)
$flights.watch((boards: Flight[]) => {
	if (!boards.length) {
		flightSelectReset()
	}

	const routeSelect = $routeSelect.getState()
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

	const flightSelect = $selectedFlight.getState()
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

export const routeEditFx = createEffect<Route, Flight[]>()

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
$flights.on(routeAddFx, (boards, flight) => {
	const findBoard = boards.find(value => value.id === flight.flightId)
	if (findBoard === undefined) {
		return boards
	}
	findBoard.routes = [...findBoard.routes, flight]
	const newBoards = [...boards]
	newBoards[boards.indexOf(findBoard)] = findBoard
	return newBoards
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
$flights.on(routeEditFx, (boards, flight: Route) => {
	const boardIndex = boards.findIndex(value => value.id === flight.flightId)
	const flightIndex = boards[boardIndex].routes.findIndex(value => {
		return flight.id === value.id
	})
	boards[boardIndex].routes[flightIndex] = flight
	return [...boards]
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
$selectedFlight
	.on(flightSelectFx, (_state, payload) => payload)
	.on(flightClickFx, (flight, clickedFlight) => {
		if (flight?.id === clickedFlight.id) {
			return null
		}
		return clickedFlight
	})
export const boardSelectResetFx = createEvent()
$selectedFlight.reset(boardSelectResetFx)
