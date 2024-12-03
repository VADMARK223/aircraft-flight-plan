import { Flight } from '../models/Flight'
import { RouteType } from '../models/RouteType'
import dayjs from 'dayjs'
import { Airport } from '../models/Airport'
import { generateContractId } from './utils'

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
		contractId: generateContractId(),
		routes: [
			{
				id: 11,
				flightId: 1,
				routeTypeId: RouteType.DEFAULT,
				scheduledDepartureDate: dayjs().startOf('day').add(0, 'hours'),
				scheduledArrivalDate: dayjs().startOf('day').add(2, 'hours'),
				airportStart: 'AAQ',
				airportEnd: 'ABA'
			},
			{
				id: 21,
				flightId: 1,
				routeTypeId: RouteType.DEFAULT,
				scheduledDepartureDate: dayjs().startOf('day').add(23, 'hours'),
				scheduledArrivalDate: dayjs().startOf('day').add(25, 'hours'),
				airportStart: 'ABA',
				airportEnd: 'ACS'
			},
			{
				id: 31,
				flightId: 1,
				routeTypeId: RouteType.DEFAULT,
				scheduledDepartureDate: dayjs().startOf('day').add(28, 'hours'),
				scheduledArrivalDate: dayjs().startOf('day').add(29, 'hours'),
				airportStart: 'ADH',
				airportEnd: 'AER'
			}
		]
	},
	{
		id: 2,
		contractId: generateContractId(),
		routes: [
			{
				id: 12,
				flightId: 2,
				routeTypeId: RouteType.DEFAULT,
				scheduledDepartureDate: dayjs().startOf('day').add(1, 'hours'),
				scheduledArrivalDate: dayjs().startOf('day').add(3, 'hours'),
				airportStart: 'AMV',
				airportEnd: 'ARH'
			},
			{
				id: 22,
				flightId: 2,
				routeTypeId: RouteType.DEFAULT,
				scheduledDepartureDate: dayjs().startOf('day').add(5, 'hours'),
				scheduledArrivalDate: dayjs().startOf('day').add(6, 'hours'),
				airportStart: 'ASF',
				airportEnd: 'ARH'
			},
			{
				id: 32,
				flightId: 2,
				routeTypeId: RouteType.DEFAULT,
				scheduledDepartureDate: dayjs().startOf('day').add(18, 'hours'),
				scheduledArrivalDate: dayjs().startOf('day').add(30, 'hours'),
				airportStart: 'AMV',
				airportEnd: 'AER'
			},
			{
				id: 42,
				flightId: 2,
				routeTypeId: RouteType.DEFAULT,
				scheduledDepartureDate: dayjs().startOf('day').add(32, 'hours'),
				scheduledArrivalDate: dayjs().startOf('day').add(33, 'hours'),
				airportStart: 'ADH',
				airportEnd: 'ACS'
			}
		]
	},
	{
		id: 3,
		contractId: generateContractId(),
		routes: [
			{
				id: 13,
				flightId: 3,
				routeTypeId: RouteType.DEFAULT,
				scheduledDepartureDate: dayjs().startOf('day').add(3, 'hours'),
				scheduledArrivalDate: dayjs().startOf('day').add(6, 'hours'),
				airportStart: 'ABA',
				airportEnd: 'AAQ'
			}
		]
	},
	{
		id: 4,
		contractId: generateContractId(),
		routes: [
			{
				id: 14,
				flightId: 4,
				routeTypeId: RouteType.DEFAULT,
				scheduledDepartureDate: dayjs().startOf('day').add(5, 'hours'),
				scheduledArrivalDate: dayjs().startOf('day').add(16, 'hours'),
				airportStart: 'ABA',
				airportEnd: 'AER'
			}
		]
	},
	{
		id: 5,
		contractId: generateContractId(),
		routes: [
			{
				id: 15,
				flightId: 5,
				routeTypeId: RouteType.ROUTINE_MAINTENANCE,
				scheduledDepartureDate: dayjs().startOf('day').add(15, 'hours'),
				scheduledArrivalDate: dayjs().startOf('day').add(30, 'hours'),
				airportStart: 'ARH',
				airportEnd: 'ASF'
			}
		]
	},
	{
		id: 6,
		contractId: generateContractId(),
		routes: [
			{
				id: 16,
				flightId: 6,
				routeTypeId: RouteType.DEFAULT,
				scheduledDepartureDate: dayjs().startOf('day').add(11, 'hours'),
				scheduledArrivalDate: dayjs().startOf('day').add(14, 'hours'),
				airportStart: 'ASF',
				airportEnd: 'AER'
			},
			{
				id: 26,
				flightId: 6,
				routeTypeId: RouteType.DEFAULT,
				scheduledDepartureDate: dayjs().startOf('day').add(32, 'hours'),
				scheduledArrivalDate: dayjs().startOf('day').add(35, 'hours'),
				airportStart: 'AAQ',
				airportEnd: 'ACS'
			}
		]
	},
	{
		id: 7,
		contractId: generateContractId(),
		routes: [
			{
				id: 17,
				flightId: 7,
				routeTypeId: RouteType.ROUTINE_MAINTENANCE,
				scheduledDepartureDate: dayjs().startOf('day').add(0, 'hours'),
				scheduledArrivalDate: dayjs().startOf('day').add(42, 'hours'),
				airportStart: 'AAQ',
				airportEnd: 'ABA'
			}
		]
	},
	{
		id: 8,
		contractId: generateContractId(),
		routes: [
			{
				id: 18,
				flightId: 8,
				routeTypeId: RouteType.DEFAULT,
				scheduledDepartureDate: dayjs().startOf('day').add(0.5, 'hours'),
				scheduledArrivalDate: dayjs().startOf('day').add(3.5, 'hours'),
				airportStart: 'ADH',
				airportEnd: 'ARH'
			}
		]
	},
	{
		id: 9,
		contractId: generateContractId(),
		routes: [
			{
				id: 19,
				flightId: 9,
				routeTypeId: RouteType.DEFAULT,
				scheduledDepartureDate: dayjs().startOf('day').add(1, 'hours'),
				scheduledArrivalDate: dayjs().startOf('day').add(3, 'hours'),
				airportStart: 'ASF',
				airportEnd: 'ADH'
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
