import { createStore } from 'effector'
import { DictDto } from '../models/dto/DictDto'
import { fetchAircraftTypeFx, fetchRouteTypeFx } from '../api/dict'
import { LOCAL_MODE } from '../utils/consts'

/**
 * @author Markitanov Vadim
 * @since 03.12.2024
 */
const defaultAircraftTypeStore: DictDto[] = [
	{ value: 3, label: 'Обычный' },
	{ value: 4, label: 'Грузовой' }
]
export const $aircraftTypeDictStore = createStore<DictDto[]>(LOCAL_MODE ? defaultAircraftTypeStore : [])
$aircraftTypeDictStore.on(fetchAircraftTypeFx.doneData, (_state, payload) => payload)

const defaultRouteTypeStore: DictDto[] = [
	{ value: 0, label: 'Технический' },
	{ value: 1, label: 'Обычный' },
	{ value: 2, label: 'Срочный' }
]
export const $routeTypeDictStore = createStore<DictDto[]>(LOCAL_MODE ? defaultRouteTypeStore : [])
$routeTypeDictStore.on(fetchRouteTypeFx.doneData, (_state, payload) => payload)
