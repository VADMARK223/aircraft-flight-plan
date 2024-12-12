import { DateSchema } from './zodSchemas'
import { z } from 'zod'

/**
 * Модель перелета.
 *
 * @author Markitanov Vadim
 * @since 22.11.2023
 */
// Схема перелета
export const RouteSchema = z.object({
	id: z.number().nullable(),
	flightId: z.number(),
	routeTypeId: z.number(),
	scheduledDepartureDate: DateSchema,
	scheduledArrivalDate: DateSchema,
	airportDepartureId: z.number(),
	aptDeptIata: z.string(),
	aptDeptIcao: z.string(),
	aptDeptName: z.string(),
	airportArrivalId: z.number(),
	aptArrIata: z.string(),
	aptArrIcao: z.string(),
	aptArrName: z.string()
})

export type Route = z.infer<typeof RouteSchema>
