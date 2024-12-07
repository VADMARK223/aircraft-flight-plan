/**
 * @author Markitanov Vadim
 * @since 07.12.2024
 */
import { createEffect } from 'effector/compat'
import { apiGet } from './common'
import { Airport } from '../models/Airport'

export const fetchAirportsFx = createEffect(async () => {
	return await apiGet<Airport[]>('airport/get_airports')
})
