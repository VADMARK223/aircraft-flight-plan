import { FlightViewModelDrag } from './FlightViewModelDrag'
import { DragType } from './DragType'

/**
 * @author Markitanov Vadim
 * @since 30.11.2023
 */
export interface DragModel {
	flight: FlightViewModelDrag
	type: DragType
}