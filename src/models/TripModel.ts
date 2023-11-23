import dayjs from "dayjs";
import {TripType} from "./TripType";

/**
 * @author Markitanov Vadim
 * @since 22.11.2023
 */
export interface TripModel {
    id: string
    flightId: number
    startDate: dayjs.Dayjs
    endDate: dayjs.Dayjs
    type: TripType
}