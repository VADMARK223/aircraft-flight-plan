import dayjs from 'dayjs'
import { FlightType } from './FlightType'

/**
 * @author Markitanov Vadim
 * @since 22.11.2023
 */
export interface Flight {
	id: string
	flightId: number
	startDate: dayjs.Dayjs
	endDate: dayjs.Dayjs
	type: FlightType
}