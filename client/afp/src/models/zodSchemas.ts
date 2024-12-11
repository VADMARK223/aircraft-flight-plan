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
export const DateSchema = z.string()
	.refine((date) => dayjs(date).isValid(), { message: 'Invalid date format' })
	.transform((serverTimeUTC) => dayjs.utc(serverTimeUTC).tz(USER_TIME_ZONE))




