/**
 * @author Markitanov Vadim
 * @since 08.12.2023
 */
import { createStore } from 'effector'
import { fetchAirportsFx } from '../api/airport'
import { Airport } from '../models/Airport'

export const $airports = createStore<Airport[]>([])
$airports.on(fetchAirportsFx.doneData, (state, payload) => payload)
