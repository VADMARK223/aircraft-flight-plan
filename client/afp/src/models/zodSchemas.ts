/**
 * @author Markitanov Vadim
 * @since 03.12.2024
 */
import { z } from 'zod'
import dayjs from 'dayjs'

// Схема даты, что это строка, она соответствует формату, также конвертируем Dayjs
const DateSchema = z.string()
	.refine((date) => dayjs(date).isValid(), { message: 'Invalid date format' })
	.transform((date) => dayjs(date))

// Схема перелета
const RouteSchema = z.object({
	id: z.number(),
	flightId: z.number(),
	scheduledDepartureDate: DateSchema
})

// Схема рейса
const FlightSchema = z.object({
	id: z.number(),
	routes: z.array(RouteSchema)
})

// Схема группы рейсов
export const FlightsSchema = z.array(FlightSchema)
