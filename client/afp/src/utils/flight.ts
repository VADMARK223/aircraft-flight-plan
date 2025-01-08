import { Flight } from '../models/Flight'

/**
 * @author Markitanov Vadim
 * @since 08.01.2025
 */
export const EMPTY_FLIGHT: Flight = {
	id: -1,
	contract: { value: -1, label: 'Пустой контракт' },
	routes: []
}
