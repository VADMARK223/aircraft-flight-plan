import {TripModel} from "./TripModel";

/**
 * @author Markitanov Vadim
 * @since 22.11.2023
 */
export interface FlightModel {
    id: number
    name: string
    trips: TripModel[]
    type?: string
}