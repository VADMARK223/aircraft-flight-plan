import { z } from 'zod'

/**
 * Модель словаря.
 *
 * @author Markitanov Vadim
 * @since 03.12.2024
 */
// Схема элемента словаря
export const DictItemSchema = z.object({
		value: z.number(),
		label: z.string()
	})

export type DictData = z.infer<typeof DictItemSchema>

// Схема словаря
export const DictDataSchema = z.array(DictItemSchema)
