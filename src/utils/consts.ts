import { Board } from '../models/Board'
import { BoardType } from '../models/BoardType'
import { FlightType } from '../models/FlightType'
import dayjs from 'dayjs'
import { Airport } from '../models/Airport'
import { Currency } from '../models/Currency'

/**
 * @author Markitanov Vadim
 * @since 22.11.2023
 */
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

export const boardsDefault: Board[] = [
	{
		id: 1,
		name: 'Борт 1',
		type: BoardType.LOW,
		flights: [
			{
				id: '11',
				boardId: 1,
				type: FlightType.DEFAULT,
				startDate: dayjs().startOf('day').add(0, 'hours'),
				endDate: dayjs().startOf('day').add(2, 'hours'),
				airportStart: 'AAQ',
				airportEnd: 'ABA',
				price: { value: 167, currency: Currency.RUB }
			},
			{
				id: '21',
				boardId: 1,
				type: FlightType.DEFAULT,
				startDate: dayjs().startOf('day').add(23, 'hours'),
				endDate: dayjs().startOf('day').add(25, 'hours'),
				airportStart: 'ABA',
				airportEnd: 'ACS',
				price: { value: 167, currency: Currency.USD }
			},
			{
				id: '31',
				boardId: 1,
				type: FlightType.DEFAULT,
				startDate: dayjs().startOf('day').add(28, 'hours'),
				endDate: dayjs().startOf('day').add(29, 'hours'),
				airportStart: 'ADH',
				airportEnd: 'AER',
				price: { value: 123, currency: Currency.USD }
			}
		]
	},
	{
		id: 2,
		name: 'Борт 2',
		type: BoardType.DEFAULT,
		flights: [
			{
				id: '12',
				boardId: 2,
				type: FlightType.DEFAULT,
				startDate: dayjs().startOf('day').add(1, 'hours'),
				endDate: dayjs().startOf('day').add(3, 'hours'),
				airportStart: 'AMV',
				airportEnd: 'ARH',
				price: { value: 234, currency: Currency.USD }
			},
			{
				id: '22',
				boardId: 2,
				type: FlightType.DEFAULT,
				startDate: dayjs().startOf('day').add(5, 'hours'),
				endDate: dayjs().startOf('day').add(6, 'hours'),
				airportStart: 'ASF',
				airportEnd: 'ARH',
				price: { value: 276, currency: Currency.USD }
			},
			{
				id: '32',
				boardId: 2,
				type: FlightType.DEFAULT,
				startDate: dayjs().startOf('day').add(18, 'hours'),
				endDate: dayjs().startOf('day').add(30, 'hours'),
				airportStart: 'AMV',
				airportEnd: 'AER',
				price: { value: 297, currency: Currency.USD }
			},
			{
				id: '42',
				boardId: 2,
				type: FlightType.DEFAULT,
				startDate: dayjs().startOf('day').add(32, 'hours'),
				endDate: dayjs().startOf('day').add(33, 'hours'),
				airportStart: 'ADH',
				airportEnd: 'ACS',
				price: { value: 300, currency: Currency.USD }
			}
		]
	},
	{
		id: 3,
		name: 'Борт 3',
		type: BoardType.LOW,
		flights: [
			{
				id: '13',
				boardId: 3,
				type: FlightType.DEFAULT,
				startDate: dayjs().startOf('day').add(3, 'hours'),
				endDate: dayjs().startOf('day').add(6, 'hours'),
				airportStart: 'ABA',
				airportEnd: 'AAQ',
				price: { value: 300, currency: Currency.USD }
			}
		]
	},
	{
		id: 4,
		name: 'Борт 4',
		type: BoardType.PRIORITY,
		flights: [
			{
				id: '14',
				boardId: 4,
				type: FlightType.DEFAULT,
				startDate: dayjs().startOf('day').add(5, 'hours'),
				endDate: dayjs().startOf('day').add(16, 'hours'),
				airportStart: 'ABA',
				airportEnd: 'AER',
				price: { value: 400, currency: Currency.USD }
			}
		]
	},
	{
		id: 5,
		name: 'Борт 5',
		type: BoardType.LOW,
		flights: [
			{
				id: '15',
				boardId: 5,
				type: FlightType.ROUTINE_MAINTENANCE,
				startDate: dayjs().startOf('day').add(15, 'hours'),
				endDate: dayjs().startOf('day').add(30, 'hours'),
				airportStart: 'ARH',
				airportEnd: 'ASF',
				price: { value: 500, currency: Currency.USD }
			}
		]
	},
	{
		id: 6,
		name: 'Борт 6',
		type: BoardType.DEFAULT,
		flights: [
			{
				id: '16',
				boardId: 6,
				type: FlightType.DEFAULT,
				startDate: dayjs().startOf('day').add(11, 'hours'),
				endDate: dayjs().startOf('day').add(14, 'hours'),
				airportStart: 'ASF',
				airportEnd: 'AER',
				price: { value: 560, currency: Currency.USD }
			},
			{
				id: '26',
				boardId: 6,
				type: FlightType.DEFAULT,
				startDate: dayjs().startOf('day').add(32, 'hours'),
				endDate: dayjs().startOf('day').add(35, 'hours'),
				airportStart: 'AAQ',
				airportEnd: 'ACS',
				price: { value: 600, currency: Currency.USD }
			}
		]
	},
	{
		id: 7,
		name: 'Борт 7',
		type: BoardType.DEFAULT,
		flights: [
			{
				id: '17',
				boardId: 7,
				type: FlightType.ROUTINE_MAINTENANCE,
				startDate: dayjs().startOf('day').add(0, 'hours'),
				endDate: dayjs().startOf('day').add(42, 'hours'),
				airportStart: 'AAQ',
				airportEnd: 'ABA',
				price: { value: 700, currency: Currency.USD }
			}
		]
	},
	{
		id: 8,
		name: 'Борт 8',
		type: BoardType.DEFAULT,
		flights: [
			{
				id: '18',
				boardId: 8,
				type: FlightType.DEFAULT,
				startDate: dayjs().startOf('day').add(0.5, 'hours'),
				endDate: dayjs().startOf('day').add(3.5, 'hours'),
				airportStart: 'ADH',
				airportEnd: 'ARH',
				price: { value: 800, currency: Currency.USD }
			}
		]
	},
	{
		id: 9,
		name: 'Борт 9',
		type: BoardType.PRIORITY,
		flights: [
			{
				id: '19',
				boardId: 9,
				type: FlightType.DEFAULT,
				startDate: dayjs().startOf('day').add(1, 'hours'),
				endDate: dayjs().startOf('day').add(3, 'hours'),
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