import React from 'react';
import {DATE_ITEM_HEIGHT, DATE_ITEM_WIDTH, dates, FLIGHT_ITEM_HEIGHT, FLIGHT_ITEM_WIDTH, flights} from "./utils/consts";
import DateItem from "./components/DateItem";
import FlightItem from "./components/FlightItem";
import Trips from "./components/Trips";

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
            <Trips/>
        </svg>
    );
}

export default App;
