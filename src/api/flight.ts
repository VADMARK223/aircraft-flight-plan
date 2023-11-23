/**
 * @author Markitanov Vadim
 * @since 23.11.2023
 */
import {createEffect, createStore} from 'effector'
import {FlightModel} from "../models/FlightModel";
import {defaultFlights} from "../utils/consts";
import {TripModel} from "../models/TripModel";

export const addFlightFx = createEffect<FlightModel, FlightModel[]>()
export const addTripFx = createEffect<TripModel, FlightModel[]>()
export const $flights = createStore<FlightModel[]>(defaultFlights)
    .on(addFlightFx, (state, payload) => {
        if (payload.id === -1) {
            let maxId = Math.max(...state.map(value => value.id))
            payload.id = ++maxId
        }

        return [...state, payload]
    })
    .on(addTripFx, (state, payload) => {
        const findFlight = state.find(value => value.id === payload.flightId)
        if (findFlight !== undefined) {
            findFlight.trips?.push(payload)
        }
        return state
    })