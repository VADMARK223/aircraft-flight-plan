import { createEffect } from 'effector/compat'
import { apiGet } from './common'
import { DictSchema } from '../models/zodSchemas'
import { DictDto } from '../models/dto/DictDto'

/**
 * @author Markitanov Vadim
 * @since 03.12.2024
 */
export const fetchAircraftTypeFx = createEffect<void, DictDto[]>(async () => {
	const flightsFromServer = await apiGet<DictDto[]>('dict/dict_aircraft_type')
	return DictSchema.parse(flightsFromServer) as DictDto[]
})

export const fetchRouteTypeFx = createEffect<void, DictDto[]>(async () => {
	const flightsFromServer = await apiGet<DictDto[]>('dict/dict_route_type')
	return DictSchema.parse(flightsFromServer) as DictDto[]
})

export const fetchContracts = async () => {
	return await apiGet<DictDto[]>('dict/dict_contract')
}
