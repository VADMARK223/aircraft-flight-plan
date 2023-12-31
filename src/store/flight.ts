import { createEvent, createStore, sample } from 'effector'
import { Flight } from '../models/Flight'
import { createEffect } from 'effector/compat'
import { Board } from '../models/Board'

/**
 * Хранилище полётов.
 *
 * @author Markitanov Vadim
 * @since 04.12.2023
 */

export const flightSelectFx = createEffect<Flight, Flight>('Событие пренудительного выбора полета')
export const flightClickFx = createEffect<Flight, Flight>('Событие клика по полету')
export const flightSelectReset = createEvent()
export const flightBoardIdChanged = createEvent<number>('Событие смены борта у полета.')
export const $flightsSelect = createStore<Flight | null>(null)
	.on(flightClickFx, (state, payload) => {
		if (state?.id === payload.id) {
			return null
		}
		return payload
	})
	.on(flightSelectFx, (state, payload) => payload)
	.reset(flightSelectReset)

export const flightAddFx = createEffect<Flight, Board[]>()
export const flightDeleteFx = createEffect<Flight, Board[]>()

sample({
	source: flightDeleteFx,
	clock: flightBoardIdChanged,
	fn: (flight: Flight, boardId: number) => {
		flight.boardId = boardId
		return flight
	},
	target: flightAddFx
})