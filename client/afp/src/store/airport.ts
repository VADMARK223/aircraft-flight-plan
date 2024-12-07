/**
 * @author Markitanov Vadim
 * @since 08.12.2023
 */
import { createStore } from 'effector'
import { airportsDefault, LOCAL_MODE } from '../utils/consts'
import { DictDto } from '../models/dto/DictDto'
import { fetchAirportsFx } from '../api/dict'

export const $airports = createStore<DictDto[]>(LOCAL_MODE ? airportsDefault : [])
$airports.on(fetchAirportsFx.doneData, (state, payload) => payload)
