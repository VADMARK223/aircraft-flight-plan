import React from 'react';
import {
    DATE_ITEM_HEIGHT,
    DATE_ITEM_WIDTH,
    dates,
    FLIGHT_ITEM_HEIGHT,
    FLIGHT_ITEM_WIDTH,
    HEADER_HEIGHT
} from "./utils/consts";
import DateItem from "./components/DateItem";
import FlightItem from "./components/FlightItem";
import Trips from "./components/Trips";
import Background from "./components/Background";
import InfoPanel from "./components/InfoPanel";
import Header from "./components/Header";
import Border from "./components/Border";
import {$flights} from "./api/flight";
import {useStore} from 'effector-react'
import {Space} from 'antd'
import ControlPanel from "./components/controlPanel/ControlPanel";

function App() {
    const flights = useStore($flights)

    return (
        <Space direction={'vertical'}>
            <ControlPanel/>
            <svg width={1530}
                 height={650}
                 style={{backgroundColor: 'gray'}}
            >
                <InfoPanel/>
                <Header/>
                {flights.map((value, index) => (
                    <FlightItem key={value.id}
                                data={value}
                                x={0}
                                y={HEADER_HEIGHT + DATE_ITEM_HEIGHT + FLIGHT_ITEM_HEIGHT * index}
                                width={FLIGHT_ITEM_WIDTH}
                                height={FLIGHT_ITEM_HEIGHT}/>))}
                {dates.map((value, index) => (
                    <DateItem key={index}
                              data={value}
                              x={FLIGHT_ITEM_WIDTH + DATE_ITEM_WIDTH * index}
                              y={HEADER_HEIGHT}/>))}
                <Background/>
                <Trips/>
                <Border/>
            </svg>
        </Space>
    )
}

export default App;
