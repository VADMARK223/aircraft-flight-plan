import {FlightModel} from "../models/FlightModel";
import {DateModel} from "../models/DateModel";
import dayjs from "dayjs";

/**
 * @author Markitanov Vadim
 * @since 22.11.2023
 */
export const FLIGHT_ITEM_WIDTH = 100
export const FLIGHT_ITEM_HEIGHT = 50

export const DATE_ITEM_WIDTH = 200
export const DATE_ITEM_HEIGHT = 45

export const flights: FlightModel[] = [
    {name: '82044 M'},
    {name: '82068'},
    {name: '82047 M'},
    {name: '82077 M'}
]

const generateDates = (): DateModel[] => {
    const startDate = dayjs().startOf('day')
    const result: DateModel[] = []
    for (let i = 0; i < 7; i++) {
        const newDate = startDate.add(i * 6, 'hours')
        result.push({
            date: newDate,
            title: `(W47 / 31${i})`
        })
    }

    return result
}

export const dates: DateModel[] = generateDates()