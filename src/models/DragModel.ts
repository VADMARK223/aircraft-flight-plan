import { FlightViewModel } from './FlightViewModel'
import { DragType } from './DragType'

/**
 * @author Markitanov Vadim
 * @since 30.11.2023
 */
export interface DragModel {
	flight: FlightViewModel
	type: DragType
}