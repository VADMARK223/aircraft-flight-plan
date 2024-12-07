import { Dayjs } from 'dayjs'
import { RouteType } from './RouteType'

/**
 * @author Markitanov Vadim
 * @since 22.11.2023
 */
export interface Route {
	id: number
	flightId: number // Идентификатор рейса
	routeTypeId: RouteType // Тип перелета
	scheduledDepartureDate: Dayjs // Плановая дата вылета
	scheduledArrivalDate: Dayjs // Плановая дата прилета
	// Аэропорт вылета
	aptDepartId?: number
	aptDeptIata?: string
	aptDeptIcao?: string
	aptDeptName?: string
	// Аэропорт прилета
	aptArrId?: number
	aptArrIata?: string
	aptArrIcao?: string
	aptArrName?: string
}
