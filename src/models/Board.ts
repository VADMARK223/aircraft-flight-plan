import { Flight } from './Flight'

/**
 * @author Markitanov Vadim
 * @since 02.12.2023
 */
export interface Board {
	id: number
	name: string
	flights: Flight[]
	type?: string
}