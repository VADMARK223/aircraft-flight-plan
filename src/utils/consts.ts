import { DateModel } from '../models/DateModel'
import dayjs from 'dayjs'
import { getWeekCount } from './utils'
import { Flight } from '../models/Flight'
import { Board } from '../models/Board'

/**
 * @author Markitanov Vadim
 * @since 22.11.2023
 */
export const HEADER_HEIGHT = 30
export const BOARD_ITEM_WIDTH = 140
export const BOARD_ITEM_HEIGHT = 60
export const FLIGHT_ITEM_HEIGHT = BOARD_ITEM_HEIGHT * 0.3
export const DATE_ITEM_WIDTH = 180
export const DATE_ITEM_HEIGHT = 45
export const HOURS_IN_CELL = 6
export const MINUTES_IN_CELL = HOURS_IN_CELL * 60
export const DATE_FORMAT = 'DD.MM.YYYY'
export const FULL_TIME_FORMAT = 'DD.MM.YYYY HH:mm'
export const SHOW_FLIGHT_ID = false
export const SHOW_OLD_STICKS = false
export const RESIZE_STICK_WIDTH = 5

const generateDates = (): DateModel[] => {
	const startDate = dayjs().startOf('day')
	const result: DateModel[] = []
	for (let i = 0; i < 8; i++) {
		const newDate = startDate.add(i * HOURS_IN_CELL, 'hours')
		result.push({
			date: newDate,
			title: `(Н${getWeekCount(newDate)} / 31${i})`
		})
	}

	return result
}

export const dates: DateModel[] = generateDates()

export const findFlightById = (id: string | undefined, boards: Board[]): Flight | undefined => {
	let currentFlight: Flight | undefined
	for (let i = 0; i < boards.length; i++) {
		currentFlight = boards[i].flights.find(value => {
			return value.id === id
		})
		if (currentFlight !== undefined) {
			break
		}
	}

	return currentFlight
}