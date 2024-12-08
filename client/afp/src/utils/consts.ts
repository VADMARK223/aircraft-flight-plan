import { Flight } from '../models/Flight'
import { RouteType } from '../models/type/RouteType'
import dayjs from 'dayjs'
import { generateContractId } from './utils'
import { DictDto } from '../models/dto/DictDto'
import { Airport } from '../models/Airport'

/**
 * Общие константы приложения
 *
 * @author Markitanov Vadim
 * @since 22.11.2023
 */
export const LOCAL_MODE = true
export const SHOW_TEST_TOGGLE: boolean = false
export const HEADER_HEIGHT = 30
export const DATE_ITEM_HEIGHT = 45
export const FLIGHT_CELL_WIDTH = 140 // Ширина ячейки рейсов
export const CELL_HEIGHT = 80 // Высота ячейки в рабочей области
export const FLIGHT_ITEM_HEIGHT = CELL_HEIGHT * 0.3
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
				scheduledArrivalDate: dayjs().startOf('day').add(6, 'hours'),
				aptDepartId: 1,
				aptDeptIata: 'VKO',
				aptDeptIcao: 'UUWW',
				aptDeptName: 'Внуково',
				aptArrId: 2,
				aptArrIata: 'SVO',
				aptArrIcao: 'UUEE',
				aptArrName: 'Шереметьево'
			}
			/*{
				id: 21,
				flightId: 1,
				routeTypeId: RouteType.DEFAULT,
				scheduledDepartureDate: dayjs().startOf('day').add(23, 'hours'),
				scheduledArrivalDate: dayjs().startOf('day').add(25, 'hours'),
				aptDeptIata: 'ABA',
				aptArrIata: 'ACS'
			},
			{
				id: 31,
				flightId: 1,
				routeTypeId: RouteType.DEFAULT,
				scheduledDepartureDate: dayjs().startOf('day').add(28, 'hours'),
				scheduledArrivalDate: dayjs().startOf('day').add(29, 'hours'),
				aptDeptIata: 'ADH',
				aptArrIata: 'AER'
			}*/
		]
	},
	{
		id: 2,
		contractId: generateContractId(),
		routes: [
			/*{
				id: 12,
				flightId: 2,
				routeTypeId: RouteType.DEFAULT,
				scheduledDepartureDate: dayjs().startOf('day').add(1, 'hours'),
				scheduledArrivalDate: dayjs().startOf('day').add(3, 'hours'),
				aptDeptIata: 'AMV',
				aptArrIata: 'ARH'
			},
			{
				id: 22,
				flightId: 2,
				routeTypeId: RouteType.DEFAULT,
				scheduledDepartureDate: dayjs().startOf('day').add(5, 'hours'),
				scheduledArrivalDate: dayjs().startOf('day').add(6, 'hours'),
				aptDeptIata: 'ASF',
				aptArrIata: 'ARH'
			},
			{
				id: 32,
				flightId: 2,
				routeTypeId: RouteType.DEFAULT,
				scheduledDepartureDate: dayjs().startOf('day').add(18, 'hours'),
				scheduledArrivalDate: dayjs().startOf('day').add(30, 'hours'),
				aptDeptIata: 'AMV',
				aptArrIata: 'AER'
			},
			{
				id: 42,
				flightId: 2,
				routeTypeId: RouteType.DEFAULT,
				scheduledDepartureDate: dayjs().startOf('day').add(32, 'hours'),
				scheduledArrivalDate: dayjs().startOf('day').add(33, 'hours'),
				aptDeptIata: 'ADH',
				aptArrIata: 'ACS'
			}*/
		]
	}
	/*{
		id: 3,
		contractId: generateContractId(),
		routes: [
			{
				id: 13,
				flightId: 3,
				routeTypeId: RouteType.DEFAULT,
				scheduledDepartureDate: dayjs().startOf('day').add(3, 'hours'),
				scheduledArrivalDate: dayjs().startOf('day').add(6, 'hours'),
				aptDeptIata: 'ABA',
				aptArrIata: 'AAQ'
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
				aptDeptIata: 'ABA',
				aptArrIata: 'AER'
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
				aptDeptIata: 'ARH',
				aptArrIata: 'ASF'
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
				aptDeptIata: 'ASF',
				aptArrIata: 'AER'
			},
			{
				id: 26,
				flightId: 6,
				routeTypeId: RouteType.DEFAULT,
				scheduledDepartureDate: dayjs().startOf('day').add(32, 'hours'),
				scheduledArrivalDate: dayjs().startOf('day').add(35, 'hours'),
				aptDeptIata: 'AAQ',
				aptArrIata: 'ACS'
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
				aptDeptIata: 'AAQ',
				aptArrIata: 'ABA'
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
				aptDeptIata: 'ADH',
				aptArrIata: 'ARH'
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
				aptDeptIata: 'ASF',
				aptArrIata: 'ADH'
			}
		]
	}*/
]

export const contractsDefault: DictDto[] = [
	{ value: 888, label: 'Контракт 888' },
	{ value: 999, label: 'Контракт 999' }
]

export const airportsDefault: Airport[] = [
	{
		airportId: 1,
		airportName: 'Внуково',
		iata: 'VKO',
		icao: 'UUWW'
	},
	{
		airportId: 2,
		airportName: 'Шереметьево',
		iata: 'SVO',
		icao: 'UUEE'
	}
]
