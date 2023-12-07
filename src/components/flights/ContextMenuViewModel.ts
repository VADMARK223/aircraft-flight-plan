import { FlightViewModel } from '../../models/FlightViewModel'

/**
 * @author Markitanov Vadim
 * @since 07.12.2023
 */
export interface ContextMenuViewModel {
	offsetX: number
	offsetY: number
	model: FlightViewModel
}