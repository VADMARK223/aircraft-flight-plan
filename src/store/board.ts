import { Board } from '../models/Board'
import { createEffect } from 'effector/compat'
import { Flight } from '../models/Flight'
import { createEvent, createStore } from 'effector'
import { flightSelectResetFx } from './flight'
import { fetchBoardsFx } from '../api/board'
import { toast } from 'react-toastify'
import { getBoardIndexByBoardId } from '../utils/board'
import { boardsDefault } from '../utils/consts'

/**
 * @author Markitanov Vadim
 * @since 04.12.2023
 */

export const $boards = createStore<Board[]>(boardsDefault)
export const $boardSelect = createStore<Board | null>(null)
$boards.watch((boards: Board[]) => {
	if (!boards.length) {
		flightSelectResetFx()
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
export const flightAddFx = createEffect<Flight, Board[]>()
export const flightEditFx = createEffect<Flight, Board[]>()
export const flightDeleteFx = createEffect<string, Board[]>()
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
	const findBoardIndex = boards.indexOf(findBoard)
	if (findBoardIndex === -1) {
		return boards
	}
	findBoard.flights = [...findBoard.flights, flight]
	const newBoards = [...boards]
	newBoards[findBoardIndex] = findBoard
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
	const flightIndex = boards[boardIndex].flights.findIndex(value => {
		return flight.id === value.id
	})
	boards[boardIndex].flights[flightIndex] = flight
	return [...boards]
	// flightDeleteFx(flight.id)
	// flight.boardId = newBoardId
	// flightAddFx(flight)
})
$boards.on(flightDeleteFx, (boards, flightId) => {
	let findBoardIndex = -1, findFlightIndex = -1, stopFind = false
	for (let i = 0; i < boards.length; i++) {
		if (stopFind) {
			break
		}
		const board = boards[i]
		for (let j = 0; j < board.flights.length; j++) {
			const flight = board.flights[j]
			stopFind = flight.id === flightId
			if (stopFind) {
				findBoardIndex = boards.indexOf(board)
				findFlightIndex = board.flights.indexOf(flight)
				break
			}
		}
	}

	const newBoards = [...boards]
	const newFlights = [...boards[findBoardIndex].flights]
	newBoards[findBoardIndex].flights = [...newFlights.slice(0, findFlightIndex), ...newFlights.slice(findFlightIndex + 1)]
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