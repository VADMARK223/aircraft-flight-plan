import { createEvent, createStore } from 'effector'
import { Flight } from '../models/Flight'
import { createEffect } from 'effector/compat'

/**
 * @author Markitanov Vadim
 * @since 04.12.2023
 */

export const flightClickFx = createEffect<Flight, Flight>('Событие клика по полету')
export const flightSelectResetFx = createEvent()
export const $flightsSelect = createStore<Flight | null>(null)
	.on(flightClickFx, (state, payload) => {
		if (state?.id === payload.id) {
			return null
		}
		return payload
	})
	.reset(flightSelectResetFx)

export interface EditFlightDto {
	flight: Flight
	newBoardId: number
}