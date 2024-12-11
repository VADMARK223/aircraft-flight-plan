import { createStore } from 'effector'
import { DictData } from '../models/DictData'
import { fetchAircraftTypeFx, fetchRouteTypeFx } from '../api/dict'
import { LOCAL_MODE } from '../utils/consts'

/**
 * @author Markitanov Vadim
 * @since 03.12.2024
 */
const defaultAircraftTypeStore: DictData[] = [
	{ value: 3, label: 'Обычный' },
	{ value: 4, label: 'Грузовой' }
]
export const $aircraftTypeDictStore = createStore<DictData[]>(LOCAL_MODE ? defaultAircraftTypeStore : [])
$aircraftTypeDictStore.on(fetchAircraftTypeFx.doneData, (_state, payload) => payload)

const defaultRouteTypeStore: DictData[] = [
	{ value: 0, label: 'Технический' },
	{ value: 1, label: 'Обычный' },
	{ value: 2, label: 'Срочный' }
]
export const $routeTypeDictStore = createStore<DictData[]>(LOCAL_MODE ? defaultRouteTypeStore : [])
$routeTypeDictStore.on(fetchRouteTypeFx.doneData, (_state, payload) => payload)
