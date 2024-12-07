/**
 * @author Markitanov Vadim
 * @since 08.12.2023
 */
import { createStore } from 'effector'
import { airportsDefault, LOCAL_MODE } from '../utils/consts'
import { fetchAirportsFx } from '../api/airport'
import { Airport } from '../models/Airport'

export const $airports = createStore<Airport[]>(LOCAL_MODE ? airportsDefault : [])
$airports.on(fetchAirportsFx.doneData, (state, payload) => payload)
