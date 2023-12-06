import { Flight } from './Flight'

/**
 * @author Markitanov Vadim
 * @since 22.11.2023
 */
export interface FlightViewModelDrag {
	model: Flight
	oldX1: number // Начальная позиция перед перетаскиванием
	oldX2: number // Конечная позиция перед перетаскиванием
	x: number
	y: number
	width: number
	index: number
}