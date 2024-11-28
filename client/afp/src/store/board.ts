/**
 * Хранилище бортов.
 *
 * @author Markitanov Vadim
 * @since 04.12.2023
 */

import { Board } from '../models/Board'
import { createEffect } from 'effector/compat'
import { Flight } from '../models/Flight'
import { createEvent, createStore } from 'effector'
import { $flightsSelect, flightAddFx, flightDeleteFx, flightSelectReset } from './flight'
import { fetchBoardsFx } from '../api/board'
import { toast } from 'react-toastify'
import { getBoardIndexByBoardId } from '../utils/board'
import { boardsDefault } from '../utils/consts'

export const $boards = createStore<Board[]>(boardsDefault)
export const $boardSelect = createStore<Board | null>(null)
$boards.watch((boards: Board[]) => {
	if (!boards.length) {
		flightSelectReset()
	}

	const flightsSelect = $flightsSelect.getState()
	if (flightsSelect) {
		let find = false
		for (let i = 0; i < boards.length; i++) {
			if (boards[i].routes.indexOf(flightsSelect) !== -1) {
				find = true
				break
			}
		}
		if (!find) {
			flightSelectReset()
		}
	}

	const boardSelect = $boardSelect.getState()
	if (boardSelect !== null) {
		const isBoardSelectInBoards = boards.find(value => boardSelect.id === value.id)
		if (isBoardSelectInBoards === undefined) {
			boardSelectResetFx()
		}
	}
})

export const boardAddFx = createEffect<Board, Board[]>()
export const boardEditFx = createEffect<Board, Board[]>()
export const boardDeleteFx = createEffect<Board, Board[]>()
export const boardsDeleteAllFx = createEffect<void, Board[]>('Удаление всех бортов.')

export const flightEditFx = createEffect<Flight, Board[]>()

$boards.on(fetchBoardsFx.doneData, (_, payload) => payload)
$boards.on(boardAddFx, (boards: Board[], newBoard: Board) => {
	if (newBoard.id === -1) {
		let maxId = boards.length ? Math.max(...boards.map(value => value.id)) : 0
		newBoard.id = ++maxId
	}

	return [...boards, newBoard]
})
$boards.on(flightAddFx, (boards, flight) => {
	const findBoard = boards.find(value => value.id === flight.boardId)
	if (findBoard === undefined) {
		return boards
	}
	findBoard.routes = [...findBoard.routes, flight]
	const newBoards = [...boards]
	newBoards[boards.indexOf(findBoard)] = findBoard
	return newBoards
})
$boards.on(boardEditFx, (boards, board) => {
	const findBoardIndex = getBoardIndexByBoardId(boards, board.id)
	if (findBoardIndex === -1) {
		toast.warn(`Ошибка редактирования борта: ${board.id}`)
	} else {
		const newBoards = [...boards]
		newBoards[findBoardIndex] = board
		return newBoards
	}
})
$boards.on(boardDeleteFx, (boards, board) => {
	const findBoardIndex = getBoardIndexByBoardId(boards, board.id)
	if (findBoardIndex === -1) {

	} else {
		return [...boards.slice(0, findBoardIndex), ...boards.slice(findBoardIndex + 1)]
	}
})
$boards.on(boardsDeleteAllFx, _ => [])
$boards.on(flightEditFx, (boards, flight: Flight) => {
	const boardIndex = boards.findIndex(value => value.id === flight.boardId)
	const flightIndex = boards[boardIndex].routes.findIndex(value => {
		return flight.id === value.id
	})
	boards[boardIndex].routes[flightIndex] = flight
	return [...boards]
})
$boards.on(flightDeleteFx, (boards, flight) => {
	const flightId = flight.id
	let findBoardIndex = -1, findFlightIndex = -1, stopFind = false
	for (let i = 0; i < boards.length; i++) {
		if (stopFind) {
			break
		}
		const board = boards[i]
		for (let j = 0; j < board.routes.length; j++) {
			const flight = board.routes[j]
			stopFind = flight.id === flightId
			if (stopFind) {
				findBoardIndex = boards.indexOf(board)
				findFlightIndex = board.routes.indexOf(flight)
				break
			}
		}
	}

	const newBoards = [...boards]
	const newFlights = [...boards[findBoardIndex].routes]
	newBoards[findBoardIndex].routes = [...newFlights.slice(0, findFlightIndex), ...newFlights.slice(findFlightIndex + 1)]
	return newBoards
})

export const boardClickFx = createEffect<Board, Board>('Событие клика по борту')
$boardSelect.on(boardClickFx, (board, newBoard) => {
	if (board?.id === newBoard.id) {
		return null
	}
	return newBoard
})
export const boardSelectResetFx = createEvent()
$boardSelect.reset(boardSelectResetFx)
