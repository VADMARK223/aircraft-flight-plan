import dayjs from "dayjs";

/**
 * @author Markitanov Vadim
 * @since 22.11.2023
 */
export interface TripModel {
    id: string
    flightId: string
    startDate: dayjs.Dayjs
    endDate: dayjs.Dayjs
}