import {TripViewModel} from "./TripViewModel";
import {DragType} from "./DragType";

/**
 * @author Markitanov Vadim
 * @since 30.11.2023
 */
export interface DragModel {
    trip: TripViewModel
    type: DragType
}