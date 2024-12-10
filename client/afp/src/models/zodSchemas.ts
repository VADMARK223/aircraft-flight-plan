/**
 * @author Markitanov Vadim
 * @since 03.12.2024
 */
import { z } from 'zod'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { USER_TIME_ZONE } from '../utils/utils'

dayjs.extend(utc)
dayjs.extend(timezone)

// Схема даты, что это строка, она соответствует формату, также конвертируем Dayjs
const DateSchema = z.string()
	.refine((date) => dayjs(date).isValid(), { message: 'Invalid date format' })
	.transform((serverTimeUTC) => dayjs.utc(serverTimeUTC).tz(USER_TIME_ZONE))

// Схема перелета
export const RouteSchema = z.object({
	id: z.number(),
	flightId: z.number(),
	routeTypeId: z.number(),
	scheduledDepartureDate: DateSchema,
	scheduledArrivalDate: DateSchema,
	airportDepartureId: z.number(),
	aptDeptIata: z.string(),
	aptDeptIcao: z.string(),
	aptDeptName: z.string(),
	aptArrId: z.number(),
	aptArrIata: z.string(),
	aptArrIcao: z.string(),
	aptArrName: z.string()
})

// Схема рейса
export const FlightSchema = z.object({
	id: z.number(),
	routes: z.array(RouteSchema),
	contractId: z.number()
})

// Схема группы рейсов
export const FlightsSchema = z.array(FlightSchema)

// Схема элемента словаря
const DictDataSchema = z.object({
	value: z.number(),
	label: z.string()
})

// Схема словаря
export const DictSchema = z.array(DictDataSchema)
