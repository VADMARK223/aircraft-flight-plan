import { createStore } from 'effector'
import { DictData } from '../models/DictData'
import { fetchAircraftTypeFx, fetchRouteTypeFx } from '../api/dict'

/**
 * @author Markitanov Vadim
 * @since 03.12.2024
 */
export const $aircraftDictStore = createStore<DictData[]>([])
$aircraftDictStore.on(fetchAircraftTypeFx.doneData, (_state, payload) => payload)

export const $routeDictStore = createStore<DictData[]>([])
$routeDictStore.on(fetchRouteTypeFx.doneData, (_state, payload) => payload)
