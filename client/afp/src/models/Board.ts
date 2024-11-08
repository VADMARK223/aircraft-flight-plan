import { Flight } from './Flight'
import { BoardType } from './BoardType'

/**
 * Модель борта.
 *
 * @author Markitanov Vadim
 * @since 02.12.2023
 */
export interface Board {
	id: number
	name: string
	flights: Flight[]
	type: BoardType
}