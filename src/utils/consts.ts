import {FlightModel} from "../models/FlightModel";
import {DateModel} from "../models/DateModel";
import dayjs from "dayjs";

/**
 * @author Markitanov Vadim
 * @since 22.11.2023
 */
export const FLIGHT_ITEM_WIDTH = 100
export const FLIGHT_ITEM_HEIGHT = 60

export const DATE_ITEM_WIDTH = 200
export const DATE_ITEM_HEIGHT = 45

export const HOURS_IN_CELL = 6

export const flights: FlightModel[] = [
    {
        id: '1',
        name: '82044 M',
        trips: [
            {
                id: '11',
                flightId: '1',
                startDate: dayjs().startOf('day').add(0, 'hours'),
                endDate: dayjs().startOf('day').add(1, 'hours')
            },
            {
                id: '21',
                flightId: '1',
                startDate: dayjs().startOf('day').add(8, 'hours'),
                endDate: dayjs().startOf('day').add(12, 'hours')
            }
        ]
    },
    {
        id: '2',
        name: '82068',
        trips: [
            {
                id: '12',
                flightId: '2',
                startDate: dayjs().startOf('day').add(1, 'hours'),
                endDate: dayjs().startOf('day').add(3, 'hours')
            },
            {
                id: '22',
                flightId: '2',
                startDate: dayjs().startOf('day').add(5, 'hours'),
                endDate: dayjs().startOf('day').add(6, 'hours')
            }
        ]
    },
    {
        id: '3',
        name: '82047 M',
        trips: [
            {
                id: '13',
                flightId: '3',
                startDate: dayjs().startOf('day').add(3, 'hours'),
                endDate: dayjs().startOf('day').add(6, 'hours')
            }
        ]
    },
    {
        id: '4',
        name: '82077 M',
        trips: [
            {
                id: '14',
                flightId: '4',
                startDate: dayjs().startOf('day').add(5, 'hours'),
                endDate: dayjs().startOf('day').add(16, 'hours')
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
            title: `(W47 / 31${i})`
        })
    }

    return result
}

export const dates: DateModel[] = generateDates()