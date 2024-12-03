/**
 * Хранилище бортов.
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
import { requestAddFlightFx, fetchFlightsFx, requestDeleteAllFlightsFx } from '../api/flight'

export const $flights = createStore<Flight[]>(LOCAL_MODE ? flightsDefault : [])
export const $flightSelect = createStore<Flight | null>(null)
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

	const flightSelect = $flightSelect.getState()
	if (flightSelect !== null) {
		const isBoardSelectInBoards = boards.find(value => flightSelect.id === value.id)
		if (isBoardSelectInBoards === undefined) {
			boardSelectResetFx()
		}
	}
})

export const flightAddFx = createEffect<Flight, Flight[]>()
export const flightsDeleteAllFx = createEffect<void, Flight[]>('Удаление всех рейсов.')
export const boardEditFx = createEffect<Flight, Flight[]>()
export const boardDeleteFx = createEffect<Flight, Flight[]>()


export const flightEditFx = createEffect<Route, Flight[]>()

$flights.on(fetchFlightsFx.doneData, (_, payload) => payload)
sample({
	source: requestAddFlightFx.doneData,
	filter: (payload): payload is Flight => payload != null,
	target: flightAddFx
})

sample({
	source: requestDeleteAllFlightsFx.doneData,
	target: flightsDeleteAllFx
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
$flights.on(boardEditFx, (boards, board) => {
	const findBoardIndex = getBoardIndexByBoardId(boards, board.id)
	if (findBoardIndex === -1) {
		toast.warn(`Ошибка редактирования борта: ${board.id}`)
	} else {
		const newBoards = [...boards]
		newBoards[findBoardIndex] = board
		return newBoards
	}
})
$flights.on(boardDeleteFx, (boards, board) => {
	const findBoardIndex = getBoardIndexByBoardId(boards, board.id)
	if (findBoardIndex === -1) {

	} else {
		return [...boards.slice(0, findBoardIndex), ...boards.slice(findBoardIndex + 1)]
	}
})
$flights.on(flightsDeleteAllFx, _ => [])
$flights.on(flightEditFx, (boards, flight: Route) => {
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

	const newBoards = [...flights]
	const newFlights = [...flights[findBoardIndex].routes]
	newBoards[findBoardIndex].routes = [...newFlights.slice(0, findFlightIndex), ...newFlights.slice(findFlightIndex + 1)]
	return newBoards
})

export const boardClickFx = createEffect<Flight, Flight>('Событие клика по борту')
$flightSelect.on(boardClickFx, (board, newBoard) => {
	if (board?.id === newBoard.id) {
		return null
	}
	return newBoard
})
export const boardSelectResetFx = createEvent()
$flightSelect.reset(boardSelectResetFx)
