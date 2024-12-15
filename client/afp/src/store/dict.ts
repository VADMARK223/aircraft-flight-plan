import { createStore } from 'effector'
import { DictData } from '../models/DictData'
import { fetchAircraftTypeFx, fetchRouteTypeFx } from '../api/dict'

/**
 * Хранилище словарей.
 *
 * @author Markitanov Vadim
 * @since 03.12.2024
 */
export const $aircraftTypeDictStore = createStore<DictData[]>([])
$aircraftTypeDictStore.on(fetchAircraftTypeFx.doneData, (_state, payload) => payload)

export const $routeTypeDictStore = createStore<DictData[]>([])
$routeTypeDictStore.on(fetchRouteTypeFx.doneData, (_state, payload) => payload)
