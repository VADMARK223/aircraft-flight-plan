import { Route } from './Route'

/**
 * Представление модели данных полета.
 *
 * @author Markitanov Vadim
 * @since 06.12.2023
 */
export interface FlightViewModel extends Route {
	index: number
}
