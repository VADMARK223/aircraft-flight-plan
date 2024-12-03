import { Flight } from '../models/Flight'
import { RouteType } from '../models/RouteType'
import dayjs from 'dayjs'
import { Airport } from '../models/Airport'
import { Currency } from '../models/Currency'

/**
 * @author Markitanov Vadim
 * @since 22.11.2023
 */
export const LOCAL_MODE = false
export const SHOW_TEST_TOGGLE: boolean = true
export const HEADER_HEIGHT = 30
export const DATE_ITEM_HEIGHT = 45
export const BOARD_ITEM_WIDTH = 140
export const BOARD_ITEM_HEIGHT = 80
export const FLIGHT_ITEM_HEIGHT = BOARD_ITEM_HEIGHT * 0.3
export const DATE_ITEM_WIDTH = 180

export const HOURS_IN_CELL = 6
export const MINUTES_IN_CELL = HOURS_IN_CELL * 60
export const DATE_FORMAT = 'DD.MM.YYYY'
export const FULL_TIME_FORMAT = 'DD.MM.YYYY HH:mm'
export const SHOW_FLIGHT_ID = false
export const SHOW_OLD_STICKS = false
export const RESIZE_STICK_WIDTH = 5

export const flightsDefault: Flight[] = [
	{
		id: 1,
		routes: [
			{
				id: 11,
				flightId: 1,
				type: RouteType.DEFAULT,
				scheduledDepartureDate: dayjs().startOf('day').add(0, 'hours'),
				scheduledArrivalDate: dayjs().startOf('day').add(2, 'hours'),
				airportStart: 'AAQ',
				airportEnd: 'ABA',
				price: { value: 167, currency: Currency.RUB }
			},
			{
				id: 21,
				flightId: 1,
				type: RouteType.DEFAULT,
				scheduledDepartureDate: dayjs().startOf('day').add(23, 'hours'),
				scheduledArrivalDate: dayjs().startOf('day').add(25, 'hours'),
				airportStart: 'ABA',
				airportEnd: 'ACS',
				price: { value: 167, currency: Currency.USD }
			},
			{
				id: 31,
				flightId: 1,
				type: RouteType.DEFAULT,
				scheduledDepartureDate: dayjs().startOf('day').add(28, 'hours'),
				scheduledArrivalDate: dayjs().startOf('day').add(29, 'hours'),
				airportStart: 'ADH',
				airportEnd: 'AER',
				price: { value: 123, currency: Currency.USD }
			}
		]
	},
	{
		id: 2,
		routes: [
			{
				id: 12,
				flightId: 2,
				type: RouteType.DEFAULT,
				scheduledDepartureDate: dayjs().startOf('day').add(1, 'hours'),
				scheduledArrivalDate: dayjs().startOf('day').add(3, 'hours'),
				airportStart: 'AMV',
				airportEnd: 'ARH',
				price: { value: 234, currency: Currency.USD }
			},
			{
				id: 22,
				flightId: 2,
				type: RouteType.DEFAULT,
				scheduledDepartureDate: dayjs().startOf('day').add(5, 'hours'),
				scheduledArrivalDate: dayjs().startOf('day').add(6, 'hours'),
				airportStart: 'ASF',
				airportEnd: 'ARH',
				price: { value: 276, currency: Currency.USD }
			},
			{
				id: 32,
				flightId: 2,
				type: RouteType.DEFAULT,
				scheduledDepartureDate: dayjs().startOf('day').add(18, 'hours'),
				scheduledArrivalDate: dayjs().startOf('day').add(30, 'hours'),
				airportStart: 'AMV',
				airportEnd: 'AER',
				price: { value: 297, currency: Currency.USD }
			},
			{
				id: 42,
				flightId: 2,
				type: RouteType.DEFAULT,
				scheduledDepartureDate: dayjs().startOf('day').add(32, 'hours'),
				scheduledArrivalDate: dayjs().startOf('day').add(33, 'hours'),
				airportStart: 'ADH',
				airportEnd: 'ACS',
				price: { value: 300, currency: Currency.USD }
			}
		]
	},
	{
		id: 3,
		routes: [
			{
				id: 13,
				flightId: 3,
				type: RouteType.DEFAULT,
				scheduledDepartureDate: dayjs().startOf('day').add(3, 'hours'),
				scheduledArrivalDate: dayjs().startOf('day').add(6, 'hours'),
				airportStart: 'ABA',
				airportEnd: 'AAQ',
				price: { value: 300, currency: Currency.USD }
			}
		]
	},
	{
		id: 4,
		routes: [
			{
				id: 14,
				flightId: 4,
				type: RouteType.DEFAULT,
				scheduledDepartureDate: dayjs().startOf('day').add(5, 'hours'),
				scheduledArrivalDate: dayjs().startOf('day').add(16, 'hours'),
				airportStart: 'ABA',
				airportEnd: 'AER',
				price: { value: 400, currency: Currency.USD }
			}
		]
	},
	{
		id: 5,
		routes: [
			{
				id: 15,
				flightId: 5,
				type: RouteType.ROUTINE_MAINTENANCE,
				scheduledDepartureDate: dayjs().startOf('day').add(15, 'hours'),
				scheduledArrivalDate: dayjs().startOf('day').add(30, 'hours'),
				airportStart: 'ARH',
				airportEnd: 'ASF',
				price: { value: 500, currency: Currency.USD }
			}
		]
	},
	{
		id: 6,
		routes: [
			{
				id: 16,
				flightId: 6,
				type: RouteType.DEFAULT,
				scheduledDepartureDate: dayjs().startOf('day').add(11, 'hours'),
				scheduledArrivalDate: dayjs().startOf('day').add(14, 'hours'),
				airportStart: 'ASF',
				airportEnd: 'AER',
				price: { value: 560, currency: Currency.USD }
			},
			{
				id: 26,
				flightId: 6,
				type: RouteType.DEFAULT,
				scheduledDepartureDate: dayjs().startOf('day').add(32, 'hours'),
				scheduledArrivalDate: dayjs().startOf('day').add(35, 'hours'),
				airportStart: 'AAQ',
				airportEnd: 'ACS',
				price: { value: 600, currency: Currency.USD }
			}
		]
	},
	{
		id: 7,
		routes: [
			{
				id: 17,
				flightId: 7,
				type: RouteType.ROUTINE_MAINTENANCE,
				scheduledDepartureDate: dayjs().startOf('day').add(0, 'hours'),
				scheduledArrivalDate: dayjs().startOf('day').add(42, 'hours'),
				airportStart: 'AAQ',
				airportEnd: 'ABA',
				price: { value: 700, currency: Currency.USD }
			}
		]
	},
	{
		id: 8,
		routes: [
			{
				id: 18,
				flightId: 8,
				type: RouteType.DEFAULT,
				scheduledDepartureDate: dayjs().startOf('day').add(0.5, 'hours'),
				scheduledArrivalDate: dayjs().startOf('day').add(3.5, 'hours'),
				airportStart: 'ADH',
				airportEnd: 'ARH',
				price: { value: 800, currency: Currency.USD }
			}
		]
	},
	{
		id: 9,
		routes: [
			{
				id: 19,
				flightId: 9,
				type: RouteType.DEFAULT,
				scheduledDepartureDate: dayjs().startOf('day').add(1, 'hours'),
				scheduledArrivalDate: dayjs().startOf('day').add(3, 'hours'),
				airportStart: 'ASF',
				airportEnd: 'ADH',
				price: { value: 900, currency: Currency.USD }
			}
		]
	}
]

export const airportsDefault: Airport[] = [
	{
		name: 'Анапа, Краснодарский край',
		country: 'Россия',
		iata: 'AAQ',
		icao: 'URKA'
	},
	{
		name: 'Абакан, Республика Хакасия',
		country: 'Россия',
		iata: 'ABA',
		icao: 'UNAA'
	},
	{
		name: 'Ачинск, Красноярский край',
		country: 'Россия',
		iata: 'ACS',
		icao: 'UNKS'
	},
	{
		name: 'Алдан, Якутия',
		country: 'Россия',
		iata: 'ADH',
		icao: 'UEEA'
	},
	{
		name: 'Сочи, Краснодарский край',
		country: 'Россия',
		iata: 'AER',
		icao: 'URSS'
	},
	{
		name: 'Амдерма, Ненецкий АО',
		country: 'Россия',
		iata: 'AMV',
		icao: 'ULDD'
	},
	{
		name: 'Талаги, Архангельск',
		country: 'Россия',
		iata: 'ARH',
		icao: 'ULAA'
	},
	{
		name: 'Нариманово, Астрахань',
		country: 'Россия',
		iata: 'ASF',
		icao: 'URWA'
	}
]
