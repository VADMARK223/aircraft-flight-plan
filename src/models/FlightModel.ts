import {TripModel} from "./TripModel";

/**
 * @author Markitanov Vadim
 * @since 22.11.2023
 */
export interface FlightModel {
    id: string
    name: string
    trips?: TripModel[]
    type?: string
}