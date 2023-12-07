import { Board } from '../models/Board'
import { FlightType } from '../models/FlightType'
import dayjs from 'dayjs'
import { createEffect } from 'effector/compat'
import { Flight } from '../models/Flight'
import { createEvent, createStore } from 'effector'
import { deleteFlightFx, editFlightFx } from './flight'
import { fetchBoardsFx } from '../api/board'
import { redColor } from '../utils/style'
import { toast } from 'react-toastify'

/**
 * @author Markitanov Vadim
 * @since 04.12.2023
 */
export const defaultBoards: Board[] = [
	{
		id: 1,
		name: 'Борт 1',
		flights: [
			{
				id: '11',
				boardId: 1,
				type: FlightType.DEFAULT,
				startDate: dayjs().startOf('day').add(1, 'hours'),
				endDate: dayjs().startOf('day').add(2, 'hours')
			},
			{
				id: '21',
				boardId: 1,
				type: FlightType.DEFAULT,
				startDate: dayjs().startOf('day').add(23, 'hours'),
				endDate: dayjs().startOf('day').add(25, 'hours')
			},
			{
				id: '31',
				boardId: 1,
				type: FlightType.DEFAULT,
				startDate: dayjs().startOf('day').add(28, 'hours'),
				endDate: dayjs().startOf('day').add(29, 'hours')
			}
		]
	},
	{
		id: 2,
		name: 'Борт 2',
		type: redColor,
		flights: [
			{
				id: '12',
				boardId: 2,
				type: FlightType.DEFAULT,
				startDate: dayjs().startOf('day').add(1, 'hours'),
				endDate: dayjs().startOf('day').add(3, 'hours')
			},
			{
				id: '22',
				boardId: 2,
				type: FlightType.DEFAULT,
				startDate: dayjs().startOf('day').add(5, 'hours'),
				endDate: dayjs().startOf('day').add(6, 'hours')
			},
			{
				id: '32',
				boardId: 2,
				type: FlightType.DEFAULT,
				startDate: dayjs().startOf('day').add(18, 'hours'),
				endDate: dayjs().startOf('day').add(30, 'hours')
			},
			{
				id: '42',
				boardId: 2,
				type: FlightType.DEFAULT,
				startDate: dayjs().startOf('day').add(32, 'hours'),
				endDate: dayjs().startOf('day').add(33, 'hours')
			}
		]
	},
	{
		id: 3,
		name: 'Борт 3',
		type: redColor,
		flights: [
			{
				id: '13',
				boardId: 3,
				type: FlightType.DEFAULT,
				startDate: dayjs().startOf('day').add(3, 'hours'),
				endDate: dayjs().startOf('day').add(6, 'hours')
			}
		]
	},
	{
		id: 4,
		name: 'Борт 4',
		type: redColor,
		flights: [
			{
				id: '14',
				boardId: 4,
				type: FlightType.DEFAULT,
				startDate: dayjs().startOf('day').add(5, 'hours'),
				endDate: dayjs().startOf('day').add(16, 'hours')
			}
		]
	},
	{
		id: 5,
		name: 'Борт 5',
		type: redColor,
		flights: [
			{
				id: '15',
				boardId: 5,
				type: FlightType.ROUTINE_MAINTENANCE,
				startDate: dayjs().startOf('day').add(15, 'hours'),
				endDate: dayjs().startOf('day').add(30, 'hours')
			}
		]
	},
	{
		id: 6,
		name: 'Борт 6',
		flights: [
			{
				id: '16',
				boardId: 6,
				type: FlightType.DEFAULT,
				startDate: dayjs().startOf('day').add(11, 'hours'),
				endDate: dayjs().startOf('day').add(14, 'hours')
			},
			{
				id: '26',
				boardId: 6,
				type: FlightType.DEFAULT,
				startDate: dayjs().startOf('day').add(32, 'hours'),
				endDate: dayjs().startOf('day').add(35, 'hours')
			}
		]
	},
	{
		id: 7,
		name: 'Борт 7',
		type: redColor,
		flights: [
			{
				id: '17',
				boardId: 7,
				type: FlightType.ROUTINE_MAINTENANCE,
				startDate: dayjs().startOf('day').add(0, 'hours'),
				endDate: dayjs().startOf('day').add(42, 'hours')
			}
		]
	},
	{
		id: 8,
		name: 'Борт 8',
		flights: [
			{
				id: '18',
				boardId: 8,
				type: FlightType.DEFAULT,
				startDate: dayjs().startOf('day').add(0.5, 'hours'),
				endDate: dayjs().startOf('day').add(3.5, 'hours')
			}
		]
	},
	{
		id: 9,
		name: 'Борт 9',
		flights: [
			{
				id: '19',
				boardId: 9,
				type: FlightType.DEFAULT,
				startDate: dayjs().startOf('day').add(1, 'hours'),
				endDate: dayjs().startOf('day').add(3, 'hours')
			}
		]
	}
]

export const boardClickFx = createEffect<Board, Board>('Событие клика по борту')
export const resetBoardSelectFx = createEvent()
export const $boardSelect = createStore<Board | null>(null)
	.on(boardClickFx, (board, newBoard) => {
		if (board?.id === newBoard.id) {
			return null
		}
		return newBoard
	})
	.reset(resetBoardSelectFx)

export const addBoardFx = createEffect<Board, Board[]>()
export const editBoardFx = createEffect<Board, Board[]>()
export const deleteBoardFx = createEffect<Board, Board[]>()
export const deleteAllBoardsFx = createEffect<void, Board[]>('Удаление всех бортов.')
export const addFlightFx = createEffect<Flight, Board[]>()

export const $boards = createStore<Board[]>(defaultBoards)
	.on(fetchBoardsFx.doneData, (_, payload) => payload)
	.on(addBoardFx, (state, payload) => {
		if (payload.id === -1) {
			let maxId = Math.max(...state.map(value => value.id))
			payload.id = ++maxId
		}

		return [...state, payload]
	})
	.on(editBoardFx, (boards, board) => {
		const findBoardIndex = getBoardIndexByBoardId(boards, board.id)
		if (findBoardIndex === -1) {
			toast.warn(`Ошибка редактирования борта: ${board.id}`)
		} else {
			const newBoards = [...boards]
			newBoards[findBoardIndex] = board
			return newBoards
		}
	}).on(deleteBoardFx, (boards, board) => {
		const findBoardIndex = getBoardIndexByBoardId(boards, board.id)
		if (findBoardIndex === -1) {

		} else {
			return [...boards.slice(0, findBoardIndex), ...boards.slice(findBoardIndex + 1)]
		}
	}).on(deleteAllBoardsFx, state => [])
	.on(addFlightFx, (boards, flight) => {
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
	.on(editFlightFx, (boards, flight) => {
		const findBoard = boards.find(value => value.id === flight.boardId)
		if (findBoard === undefined) {
			return boards
		}
		const findBoardIndex = boards.indexOf(findBoard)
		if (findBoardIndex === -1) {
			return boards
		}
		const findFlight = findBoard.flights.find(value => {
			return flight.id === value.id
		})
		if (findFlight !== undefined) {
			findBoard.flights[findBoard.flights.indexOf(findFlight)] = flight
		}
		const newBoards = [...boards]
		newBoards[findBoardIndex] = findBoard
		return newBoards
	})
	.on(deleteFlightFx, (boards, flightId) => {
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

$boards.watch((boards) => {
	const boardSelect = $boardSelect.getState()
	if (boardSelect !== null) {
		const isBoardSelectInBoards = boards.find(value => boardSelect.id === value.id)
		if (isBoardSelectInBoards === undefined) {
			console.log('reset')
			resetBoardSelectFx()
		} else {
			console.log('not reset')
		}
	}
})

const getBoardIndexByBoardId = (boards: Board[], boardId: number): number => {
	let findBoardIndex = -1
	let stop = false
	for (let i = 0; i < boards.length; i++) {
		const board = boards[i]
		stop = board.id === boardId
		if (stop) {
			findBoardIndex = boards.indexOf(board)
			break
		}
	}

	return findBoardIndex
}
