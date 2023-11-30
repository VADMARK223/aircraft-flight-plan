import {TripModel} from "./TripModel";

/**
 * @author Markitanov Vadim
 * @since 22.11.2023
 */
export interface TripViewModel {
    // id: string
    data: TripModel
    x: number
    y: number
    width: number
    height: number
}