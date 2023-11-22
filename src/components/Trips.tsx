/**
 * Компонент
 *
 * @author Markitanov Vadim
 * @since 22.11.2023
 */
import React, {JSX, LegacyRef, useEffect, useRef, useState} from 'react';
import {
    DATE_ITEM_HEIGHT,
    DATE_ITEM_WIDTH,
    FLIGHT_ITEM_HEIGHT,
    FLIGHT_ITEM_WIDTH,
    flights,
    HOURS_IN_CELL
} from "../utils/consts";
import dayjs from "dayjs";
import TripItem from "./TripItem";
import * as d3 from "d3";

const Trips = (): JSX.Element => {
    const svgRef: LegacyRef<any> = useRef<SVGSVGElement | undefined>()
    const [position, setPosition] = useState({x: 0, y: 0})
    const [currentDragItem, setCurrentDragItem] = useState<string>()

    useEffect(() => {
        const svg = d3.select(svgRef.current)
        svg.call(d3.drag()
            .on('drag', event => {
                setPosition({
                    x: position.x + event.dx,
                    y: position.y + event.dy,
                });
            })
            .on('start', event => {
                setCurrentDragItem('13')
            })
            .on('end', event => {
                console.log('End', event)
            })
        )
    }, [position.x, position.y])

    return (
        <svg ref={svgRef}>
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
                                              data={trip}
                                              x={startX}
                                              y={DATE_ITEM_HEIGHT + FLIGHT_ITEM_HEIGHT * index}
                                              width={tripWidth}
                                              dragging={trip.id === currentDragItem}
                    />)
                })

                return (
                    <g key={`trips_items_${value.id}`}>{tripsItems}</g>
                )
            })}
        </svg>
    )
}

export default Trips