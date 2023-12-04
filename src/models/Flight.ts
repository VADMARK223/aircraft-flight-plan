import { Dayjs } from 'dayjs'
import { FlightType } from './FlightType'

/**
 * @author Markitanov Vadim
 * @since 22.11.2023
 */
export interface Flight {
	id: string
	flightId: number
	startDate: Dayjs
	endDate: Dayjs
	type: FlightType
}