import { createEffect } from 'effector/compat'
import { apiGet } from './common'
import { DictData, DictDataSchema } from '../models/DictData'

/**
 * @author Markitanov Vadim
 * @since 03.12.2024
 */
export const fetchAircraftTypeFx = createEffect<void, DictData[]>(async () => {
	const flightsFromServer = await apiGet<DictData[]>('dict/dict_aircraft_type')
	return DictDataSchema.parse(flightsFromServer)
})

export const fetchRouteTypeFx = createEffect<void, DictData[]>(async () => {
	const flightsFromServer = await apiGet<DictData[]>('dict/dict_route_type')
	return DictDataSchema.parse(flightsFromServer)
})

export const fetchContracts = async () => {
	return await apiGet<DictData[]>('dict/dict_contract')
}
