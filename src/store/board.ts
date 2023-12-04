import { Board } from '../models/Board'
import { FlightType } from '../models/FlightType'
import dayjs from 'dayjs'
import { createEffect } from 'effector/compat'
import { Flight } from '../models/Flight'
import { createStore } from 'effector'
import { editFlightFx } from './flight'
import { fetchBoardsFx } from '../api/board'

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
				flightId: 1,
				type: FlightType.DEFAULT,
				startDate: dayjs().startOf('day').add(1, 'hours'),
				endDate: dayjs().startOf('day').add(2, 'hours')
			},
			{
				id: '21',
				flightId: 1,
				type: FlightType.DEFAULT,
				startDate: dayjs().startOf('day').add(23, 'hours'),
				endDate: dayjs().startOf('day').add(25, 'hours')
			},
			{
				id: '31',
				flightId: 1,
				type: FlightType.DEFAULT,
				startDate: dayjs().startOf('day').add(28, 'hours'),
				endDate: dayjs().startOf('day').add(29, 'hours')
			}
		]
	},
	{
		id: 2,
		name: 'Борт 2',
		flights: [
			{
				id: '12',
				flightId: 2,
				type: FlightType.DEFAULT,
				startDate: dayjs().startOf('day').add(1, 'hours'),
				endDate: dayjs().startOf('day').add(3, 'hours')
			},
			{
				id: '22',
				flightId: 2,
				type: FlightType.DEFAULT,
				startDate: dayjs().startOf('day').add(5, 'hours'),
				endDate: dayjs().startOf('day').add(6, 'hours')
			}
		]
	},
	{
		id: 3,
		name: 'Борт 3',
		type: 'red',
		flights: [
			{
				id: '13',
				flightId: 3,
				type: FlightType.DEFAULT,
				startDate: dayjs().startOf('day').add(3, 'hours'),
				endDate: dayjs().startOf('day').add(6, 'hours')
			}
		]
	},
	{
		id: 4,
		name: 'Борт 4',
		type: 'red',
		flights: [
			{
				id: '14',
				flightId: 4,
				type: FlightType.DEFAULT,
				startDate: dayjs().startOf('day').add(5, 'hours'),
				endDate: dayjs().startOf('day').add(16, 'hours')
			}
		]
	},
	{
		id: 5,
		name: 'Борт 5',
		type: 'red',
		flights: [
			{
				id: '15',
				flightId: 5,
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
				flightId: 6,
				type: FlightType.DEFAULT,
				startDate: dayjs().startOf('day').add(11, 'hours'),
				endDate: dayjs().startOf('day').add(14, 'hours')
			},
			{
				id: '26',
				flightId: 6,
				type: FlightType.DEFAULT,
				startDate: dayjs().startOf('day').add(32, 'hours'),
				endDate: dayjs().startOf('day').add(35, 'hours')
			}
		]
	},
	{
		id: 7,
		name: 'Борт 7',
		type: 'red',
		flights: [
			{
				id: '17',
				flightId: 7,
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
				flightId: 1,
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
				flightId: 1,
				type: FlightType.DEFAULT,
				startDate: dayjs().startOf('day').add(1, 'hours'),
				endDate: dayjs().startOf('day').add(3, 'hours')
			}
		]
	}
]

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
		const findBoard = boards.find(value => value.id === flight.flightId)
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