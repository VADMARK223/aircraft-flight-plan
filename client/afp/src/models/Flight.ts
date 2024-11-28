import { Route } from './Route'
import { FlightType } from './FlightType'

/**
 * Модель борта.
 *
 * @author Markitanov Vadim
 * @since 02.12.2023
 */
export interface Flight {
	id: number
	name?: string
	routes: Route[]
	type: FlightType
}
