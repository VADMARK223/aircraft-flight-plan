import { Dayjs } from 'dayjs'
import { RouteType } from './RouteType'
import { Price } from './Price'

/**
 * @author Markitanov Vadim
 * @since 22.11.2023
 */
export interface Route {
	id: string
	boardId: number
	startDate: Dayjs
	endDate: Dayjs
	type: RouteType
	airportStart: string // IATA
	airportEnd: string // IATA
	price: Price | null
}
