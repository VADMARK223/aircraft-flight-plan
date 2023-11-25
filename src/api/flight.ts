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
    .on(addTripFx, (flights, trip) => {
        const findFlight = flights.find(value => value.id === trip.flightId)
        if (findFlight === undefined) {
            console.log('1')
            return flights
        }
        const flightIndex = flights.indexOf(findFlight)
        if (flightIndex === -1) {
            console.log('2')
            return flights
        }
        findFlight.trips = [...findFlight.trips, trip]
        const newFlights = [...flights]
        newFlights[flightIndex] = findFlight
        console.log('4')
        return newFlights
    })