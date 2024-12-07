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
	aptDeptIata: string // ИАТА аэропорта вылета
	aptArrIata: string // ИАТА аэропорта прилета
}
