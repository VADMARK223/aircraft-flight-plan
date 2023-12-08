import { createEvent, createStore } from 'effector'
import { Flight } from '../models/Flight'
import { createEffect } from 'effector/compat'
import { Board } from '../models/Board'

/**
 * @author Markitanov Vadim
 * @since 04.12.2023
 */

export const flightClickFx = createEffect<Flight, Flight>('Событие клика по полету')
export const resetFlightSelectFx = createEvent()
export const $flightsSelect = createStore<Flight | null>(null)
	.on(flightClickFx, (state, payload) => {
		if (state?.id === payload.id) {
			return null
		}
		return payload
	})
	.reset(resetFlightSelectFx)

export const editFlightFx = createEffect<EditFlightDto, Board[]>()
export const flightDeleteFx = createEffect<string, Board[]>()

export interface EditFlightDto {
	flight: Flight
	newBoardId: number
}