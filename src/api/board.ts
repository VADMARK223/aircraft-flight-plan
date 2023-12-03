import { createEffect } from 'effector/compat'
import { commonApi } from './common'
import { createStore } from 'effector'
import { Board } from '../models/Board'
import { defaultBoards } from '../utils/consts'
import { Flight } from '../models/Flight'

/**
 * @author Markitanov Vadim
 * @since 02.12.2023
 */

export const fetchBoardsFx = createEffect<void, Board[]>(async () => {
	try {
		return await commonApi.get('boards/get_all').json<Board[]>()
	} catch (error: any) {
		console.log('Error', error)
		return []
	}
})

export const addBoardFx = createEffect<Board, Board[]>()
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
	.on(addFlightFx, (boards, flight) => {
		const findBoard = boards.find(value => value.id === flight.flightId)
		if (findBoard === undefined) {
			return boards
		}
		const flightIndex = boards.indexOf(findBoard)
		if (flightIndex === -1) {
			return boards
		}
		findBoard.flights = [...findBoard.flights, flight]
		const newBoards = [...boards]
		newBoards[flightIndex] = findBoard
		return newBoards
	})