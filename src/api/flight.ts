/**
 * @author Markitanov Vadim
 * @since 23.11.2023
 */
import {createEffect, createStore} from 'effector'
import {FlightModel} from "../models/FlightModel";
import {defaultFlights} from "../utils/consts";

export const addFlightFx = createEffect<FlightModel, FlightModel[]>()
export const $flights = createStore<FlightModel[]>(defaultFlights)
    .on(addFlightFx, (state, payload) => {
        if (payload.id === -1) {
            let maxId = Math.max(...state.map(value => value.id))
            payload.id = ++maxId
        }

        return [...state, payload]
    })