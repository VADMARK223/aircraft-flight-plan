import {FlightModel} from "../models/FlightModel";
import {DateModel} from "../models/DateModel";
import dayjs from "dayjs";
import {getWeekCount} from "./utils";
import {TripType} from "../models/TripType";

/**
 * @author Markitanov Vadim
 * @since 22.11.2023
 */
export const HEADER_HEIGHT = 30
export const FLIGHT_ITEM_WIDTH = 140
export const FLIGHT_ITEM_HEIGHT = 60

export const TRIP_ITEM_HEIGHT = FLIGHT_ITEM_HEIGHT * 0.3

export const DATE_ITEM_WIDTH = 190
export const DATE_ITEM_HEIGHT = 45

export const HOURS_IN_CELL = 6

export const MINUTES_IN_CELL = HOURS_IN_CELL * 60

export const DATE_FORMAT = 'DD.MM.YYYY'

export const SHOW_TRIP_ID = false

export const defaultFlights: FlightModel[] = [
    {
        id: 1,
        name: '82044 M',
        trips: [
            {
                id: '11',
                flightId: 1,
                type: TripType.DEFAULT,
                startDate: dayjs().startOf('day').add(0, 'hours'),
                endDate: dayjs().startOf('day').add(1, 'hours')
            },
            {
                id: '21',
                flightId: 1,
                type: TripType.DEFAULT,
                startDate: dayjs().startOf('day').add(8, 'hours'),
                endDate: dayjs().startOf('day').add(12, 'hours')
            }
        ]
    },
    {
        id: 2,
        name: '82047 М',
        trips: [
            {
                id: '12',
                flightId: 2,
                type: TripType.DEFAULT,
                startDate: dayjs().startOf('day').add(1, 'hours'),
                endDate: dayjs().startOf('day').add(3, 'hours')
            },
            {
                id: '22',
                flightId: 2,
                type: TripType.DEFAULT,
                startDate: dayjs().startOf('day').add(5, 'hours'),
                endDate: dayjs().startOf('day').add(6, 'hours')
            }
        ]
    },
    {
        id: 3,
        name: '82068',
        type: 'red',
        trips: [
            {
                id: '13',
                flightId: 3,
                type: TripType.DEFAULT,
                startDate: dayjs().startOf('day').add(3, 'hours'),
                endDate: dayjs().startOf('day').add(6, 'hours')
            }
        ]
    },
    {
        id: 4,
        name: '82074 M',
        type: 'red',
        trips: [
            {
                id: '14',
                flightId: 4,
                type: TripType.DEFAULT,
                startDate: dayjs().startOf('day').add(5, 'hours'),
                endDate: dayjs().startOf('day').add(16, 'hours')
            }
        ]
    },
    {
        id: 5,
        name: '82077 M',
        type: 'red',
        trips: [
            {
                id: '15',
                flightId: 5,
                type: TripType.ROUTINE_MAINTENANCE,
                startDate: dayjs().startOf('day').add(15, 'hours'),
                endDate: dayjs().startOf('day').add(30, 'hours')
            }
        ]
    },
    {
        id: 6,
        name: '82079 M',
        trips: [
            {
                id: '16',
                flightId: 6,
                type: TripType.DEFAULT,
                startDate: dayjs().startOf('day').add(11, 'hours'),
                endDate: dayjs().startOf('day').add(14, 'hours')
            },
            {
                id: '26',
                flightId: 6,
                type: TripType.DEFAULT,
                startDate: dayjs().startOf('day').add(32, 'hours'),
                endDate: dayjs().startOf('day').add(35, 'hours')
            }
        ]
    },
    {
        id: 7,
        name: '82081 M',
        type:'red',
        trips: [
            {
                id: '17',
                flightId: 7,
                type: TripType.ROUTINE_MAINTENANCE,
                startDate: dayjs().startOf('day').add(0, 'hours'),
                endDate: dayjs().startOf('day').add(42, 'hours')
            }
        ]
    },
    {
        id: 8,
        name: '76503 M',
        trips: [
            {
                id: '18',
                flightId: 1,
                type: TripType.DEFAULT,
                startDate: dayjs().startOf('day').add(0.5, 'hours'),
                endDate: dayjs().startOf('day').add(3.5, 'hours')
            }
        ]
    },
    {
        id: 9,
        name: '76511 M',
        trips: [
            {
                id: '19',
                flightId: 1,
                type: TripType.DEFAULT,
                startDate: dayjs().startOf('day').add(1, 'hours'),
                endDate: dayjs().startOf('day').add(3, 'hours')
            }
        ]
    }
]

const generateDates = (): DateModel[] => {
    const startDate = dayjs().startOf('day')
    const result: DateModel[] = []
    for (let i = 0; i < 7; i++) {
        const newDate = startDate.add(i * HOURS_IN_CELL, 'hours')
        result.push({
            date: newDate,
            title: `(Н${getWeekCount(newDate)} / 31${i})`
        })
    }

    return result
}

export const dates: DateModel[] = generateDates()