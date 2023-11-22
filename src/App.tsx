import React, {JSX} from 'react';
import Background from "./components/Background";
import {
    DATE_ITEM_HEIGHT,
    DATE_ITEM_WIDTH,
    dates,
    FLIGHT_ITEM_HEIGHT,
    FLIGHT_ITEM_WIDTH,
    flights,
    HOURS_IN_CELL
} from "./utils/consts";
import DateItem from "./components/DateItem";
import FlightItem from "./components/FlightItem";
import TripItem from "./components/TripItem";
import dayjs from "dayjs";

function App() {
    return (
        <svg width={1530}
             height={650}
             style={{backgroundColor: 'gray'}}
        >
            {flights.map((value, index) => (
                <FlightItem key={value.id}
                            data={value}
                            x={0}
                            y={DATE_ITEM_HEIGHT + FLIGHT_ITEM_HEIGHT * index}
                            width={FLIGHT_ITEM_WIDTH}
                            height={FLIGHT_ITEM_HEIGHT}/>))}
            {dates.map((value, index) => (
                <DateItem key={index}
                          data={value}
                          x={FLIGHT_ITEM_WIDTH + DATE_ITEM_WIDTH * index}
                          y={0}/>))}
            <Background/>
            {flights.map((value, index) => {
                if (!value.trips) {
                    return undefined
                }
                const tripsItems: JSX.Element[] = []
                const startDay = dayjs().startOf('day')
                value.trips.forEach(trip => {
                    const diffHours = trip.startDate.diff(startDay, 'hours')
                    const tripDuration = trip.endDate.diff(trip.startDate, 'hours')
                    const startX = FLIGHT_ITEM_WIDTH + DATE_ITEM_WIDTH / HOURS_IN_CELL * diffHours
                    const tripWidth = DATE_ITEM_WIDTH / HOURS_IN_CELL * tripDuration
                    tripsItems.push(<TripItem key={trip.id}
                                              x={startX}
                                              y={DATE_ITEM_HEIGHT + FLIGHT_ITEM_HEIGHT * index}
                                              width={tripWidth}
                    />)
                })

                return (
                    <g key={`trips_items_${value.id}`}>{tripsItems}</g>
                )
            })}
        </svg>
    );
}

export default App;
