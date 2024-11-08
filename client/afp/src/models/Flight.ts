import { Dayjs } from 'dayjs'
import { FlightType } from './FlightType'
import { Price } from './Price'

/**
 * @author Markitanov Vadim
 * @since 22.11.2023
 */
export interface Flight {
	id: string
	boardId: number
	startDate: Dayjs
	endDate: Dayjs
	type: FlightType
	airportStart: string // IATA
	airportEnd: string // IATA
	price: Price | null
}