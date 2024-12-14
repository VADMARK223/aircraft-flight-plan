import { z } from 'zod'
import { RouteSchema } from './Route'
import { DictItemSchema } from './DictData'

/**
 * Модель рейса.
 *
 * @author Markitanov Vadim
 * @since 02.12.2023
 */
// Схема рейса
export const FlightSchema = z.object({
	id: z.number(),
	routes: z.array(RouteSchema),
	contract: DictItemSchema
})

// Схема группы рейсов
export const FlightsSchema = z.array(FlightSchema)

export type Flight = z.infer<typeof FlightSchema>
