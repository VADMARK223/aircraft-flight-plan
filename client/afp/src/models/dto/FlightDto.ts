import { Route } from '../Route'
import { FlightType } from '../FlightType'

/**
 * @author Markitanov Vadim
 * @since 01.12.2024
 */
export interface FlightDto {
	id: number
	name?: string
	routes: Route[]
	type: FlightType
}
