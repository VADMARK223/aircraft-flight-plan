import { DateModel } from '../models/DateModel'
import dayjs from 'dayjs'
import { getWeekCount } from './utils'
import { FlightType } from '../models/FlightType'
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

export const DATE_ITEM_WIDTH = 190
export const DATE_ITEM_HEIGHT = 45

export const HOURS_IN_CELL = 6

export const MINUTES_IN_CELL = HOURS_IN_CELL * 60

export const DATE_FORMAT = 'DD.MM.YYYY'

export const FULL_TIME_FORMAT = 'DD.MM.YYYY HH:mm'

export const SHOW_FLIGHT_ID = false

export const SHOW_OLD_STICKS = false

export const RESIZE_STICK_WIDTH = 5

export const defaultBoards: Board[] = [
	{
		id: 1,
		name: '82044 M',
		flights: [
			{
				id: '11',
				flightId: 1,
				type: FlightType.DEFAULT,
				startDate: dayjs().startOf('day').add(1, 'hours'),
				endDate: dayjs().startOf('day').add(2, 'hours')
			},
			{
				id: '21',
				flightId: 1,
				type: FlightType.DEFAULT,
				startDate: dayjs().startOf('day').add(8, 'hours'),
				endDate: dayjs().startOf('day').add(12, 'hours')
			}
		]
	},
	{
		id: 2,
		name: '82047 М',
		flights: [
			{
				id: '12',
				flightId: 2,
				type: FlightType.DEFAULT,
				startDate: dayjs().startOf('day').add(1, 'hours'),
				endDate: dayjs().startOf('day').add(3, 'hours')
			},
			{
				id: '22',
				flightId: 2,
				type: FlightType.DEFAULT,
				startDate: dayjs().startOf('day').add(5, 'hours'),
				endDate: dayjs().startOf('day').add(6, 'hours')
			}
		]
	},
	{
		id: 3,
		name: '82068',
		type: 'red',
		flights: [
			{
				id: '13',
				flightId: 3,
				type: FlightType.DEFAULT,
				startDate: dayjs().startOf('day').add(3, 'hours'),
				endDate: dayjs().startOf('day').add(6, 'hours')
			}
		]
	},
	{
		id: 4,
		name: '82074 M',
		type: 'red',
		flights: [
			{
				id: '14',
				flightId: 4,
				type: FlightType.DEFAULT,
				startDate: dayjs().startOf('day').add(5, 'hours'),
				endDate: dayjs().startOf('day').add(16, 'hours')
			}
		]
	},
	{
		id: 5,
		name: '82077 M',
		type: 'red',
		flights: [
			{
				id: '15',
				flightId: 5,
				type: FlightType.ROUTINE_MAINTENANCE,
				startDate: dayjs().startOf('day').add(15, 'hours'),
				endDate: dayjs().startOf('day').add(30, 'hours')
			}
		]
	},
	{
		id: 6,
		name: '82079 M',
		flights: [
			{
				id: '16',
				flightId: 6,
				type: FlightType.DEFAULT,
				startDate: dayjs().startOf('day').add(11, 'hours'),
				endDate: dayjs().startOf('day').add(14, 'hours')
			},
			{
				id: '26',
				flightId: 6,
				type: FlightType.DEFAULT,
				startDate: dayjs().startOf('day').add(32, 'hours'),
				endDate: dayjs().startOf('day').add(35, 'hours')
			}
		]
	},
	{
		id: 7,
		name: '82081 M',
		type: 'red',
		flights: [
			{
				id: '17',
				flightId: 7,
				type: FlightType.ROUTINE_MAINTENANCE,
				startDate: dayjs().startOf('day').add(0, 'hours'),
				endDate: dayjs().startOf('day').add(42, 'hours')
			}
		]
	},
	{
		id: 8,
		name: '76503 M',
		flights: [
			{
				id: '18',
				flightId: 1,
				type: FlightType.DEFAULT,
				startDate: dayjs().startOf('day').add(0.5, 'hours'),
				endDate: dayjs().startOf('day').add(3.5, 'hours')
			}
		]
	},
	{
		id: 9,
		name: '76511 M',
		flights: [
			{
				id: '19',
				flightId: 1,
				type: FlightType.DEFAULT,
				startDate: dayjs().startOf('day').add(1, 'hours'),
				endDate: dayjs().startOf('day').add(3, 'hours')
			}
		]
	}
]

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