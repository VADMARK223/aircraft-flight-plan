import { createStore } from 'effector'
import { DictDto } from '../models/dto/DictDto'
import { fetchAircraftTypeFx, fetchRouteTypeFx } from '../api/dict'

/**
 * @author Markitanov Vadim
 * @since 03.12.2024
 */
export const $aircraftDictStore = createStore<DictDto[]>([])
$aircraftDictStore.on(fetchAircraftTypeFx.doneData, (_state, payload) => payload)

export const $routeDictStore = createStore<DictDto[]>([])
$routeDictStore.on(fetchRouteTypeFx.doneData, (_state, payload) => payload)
