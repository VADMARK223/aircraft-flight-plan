import { createEffect } from 'effector/compat'
import { apiGet } from './common'
import { DictSchema } from '../models/zodSchemas'
import { DictData } from '../models/DictData'

/**
 * @author Markitanov Vadim
 * @since 03.12.2024
 */
export const fetchAircraftTypeFx = createEffect<void, DictData[]>(async () => {
	const flightsFromServer = await apiGet<DictData[]>('dict/dict_aircraft_type')
	return DictSchema.parse(flightsFromServer) as DictData[]
})

export const fetchRouteTypeFx = createEffect<void, DictData[]>(async () => {
	const flightsFromServer = await apiGet<DictData[]>('dict/dict_route_type')
	return DictSchema.parse(flightsFromServer) as DictData[]
})
