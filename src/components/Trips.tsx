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
    HEADER_HEIGHT,
    HOURS_IN_CELL
} from "../utils/consts";
import dayjs from "dayjs";
import * as d3 from "d3";
import {TripViewModel} from "../models/TripViewModel";
import {TripType} from "../models/TripType";
import {useStore} from "effector-react";
import {$flights} from "../api/flight";
import {FlightModel} from "../models/FlightModel";

const Trips = (): JSX.Element => {
    const flights: FlightModel[] = useStore($flights)
    const svgRef: LegacyRef<any> = useRef<SVGSVGElement | undefined>()
    const [currentDragItem, setCurrentDragItem] = useState<TripViewModel>()
    const [tripViewModels, setTripViewModels] = useState<TripViewModel[]>()
    const [startPos, setStartPos] = useState({x: 0, y: 0})

    const [shifts, setShifts] = useState({x: 0, y: 0})
    const shiftsRef = useRef(shifts);

    useEffect(() => {
        shiftsRef.current = shifts
    }, [shifts]);

    useEffect(() => {
        const svg = d3.select(svgRef.current)
        svg.call(d3.drag()
            .on('drag', event => {
                setStartPos({
                    x: event.x + shiftsRef.current.x,
                    y: event.y + shiftsRef.current.y
                });
            })
            .on('start', event => {
                tripViewModels?.forEach(value => {
                    if (
                        event.x >= value.x && event.x <= value.x + value.width &&
                        event.y >= value.y && event.y <= value.y + value.height
                    ) {
                        setCurrentDragItem(value)
                        setStartPos({
                            x: value.x,
                            y: value.y
                        })
                        setShifts({
                            x: value.x - event.x,
                            y: value.y - event.y
                        })
                    }
                })
            })
            .on('end', _ => {
                setCurrentDragItem(undefined)
                setStartPos({
                    x: 0,
                    y: 0
                })
            })
        )
    }, [startPos.x, startPos.y, tripViewModels]);

    useEffect(() => {
        const svg = d3.select(svgRef.current)

        // Очищаем все
        svg.selectAll('*').remove()

        const temp: TripViewModel[] = []
        flights.forEach((value, index) => {
            if (!value.trips) {
                return undefined
            }
            const startDay = dayjs().startOf('day')
            value.trips.forEach(tripModel => {
                const diffHours = tripModel.startDate.diff(startDay, 'hours')
                const tripDuration = tripModel.endDate.diff(tripModel.startDate, 'hours')

                const tripWidth = DATE_ITEM_WIDTH / HOURS_IN_CELL * tripDuration
                const tripHeight = FLIGHT_ITEM_HEIGHT * 0.3
                let tripX
                let tripY
                if (tripModel.id === currentDragItem?.id) {
                    tripX = startPos.x
                    tripY = startPos.y
                } else {
                    tripX = FLIGHT_ITEM_WIDTH + DATE_ITEM_WIDTH / HOURS_IN_CELL * diffHours
                    tripY = HEADER_HEIGHT + DATE_ITEM_HEIGHT + FLIGHT_ITEM_HEIGHT * index + (FLIGHT_ITEM_HEIGHT - tripHeight) * 0.5
                }

                if (tripModel.type === TripType.DEFAULT) {
                    svg.append('rect')
                        .attr('x', tripX)
                        .attr('y', tripY)
                        .attr('width', tripWidth)
                        .attr('height', tripHeight)
                        .attr('stroke', 'green')
                        .attr('fill', tripModel.id === currentDragItem?.id ? 'red' : 'lightgreen')
                        .attr('cursor', 'move')

                    svg.append('text')
                        .attr('x', tripX + 5)
                        .attr('y', tripY)
                        .attr('fill', 'white')
                        .attr('text-anchor', 'start')
                        .attr('dominant-baseline', 'hanging')
                        .attr('cursor', 'move')
                        .text(tripModel.id)

                    appendDateText(svg, tripX, tripY, tripModel.startDate)
                    appendDateText(svg, tripX + tripWidth, tripY, tripModel.endDate)
                    temp.push({id: tripModel.id, x: tripX, y: tripY, width: tripWidth, height: tripHeight})
                } else if (tripModel.type === TripType.ROUTINE_MAINTENANCE) {
                    svg.append('rect')
                        .attr('x', tripX)
                        .attr('y', tripY)
                        .attr('width', tripWidth)
                        .attr('height', tripHeight)
                        .attr('stroke', 'orange')
                        .attr('fill', 'orange')

                    svg.append('text')
                        .attr('x', tripX + tripWidth * 0.5)
                        .attr('y', tripY + tripHeight * 0.5)
                        .attr('fill', 'black')
                        .attr('font-weight', 'bold')
                        .attr('text-anchor', 'middle')
                        .attr('dominant-baseline', 'middle')
                        .text('Routine maintenance')

                    appendDateText(svg, tripX, tripY, tripModel.startDate)
                    appendDateText(svg, tripX + tripWidth, tripY, tripModel.endDate)
                }
            })
        })
        setTripViewModels(temp)

    }, [flights, startPos.x, startPos.y, currentDragItem])

    const appendDateText = (svg: any, translateX: number, translateY: number, date: dayjs.Dayjs) => {
        const endDateContainer = svg.append('g')
        endDateContainer.attr('transform', `translate(${translateX},${translateY})`)
        endDateContainer.append('text')
            .attr('font-size', 14)
            .attr('fill', 'black')
            .attr('transform', `rotate(-16)`)
            .text(date.format('HH:mm'))
    }

    return (
        <svg ref={svgRef}>
            {/*<g>
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
                                                  data={trip}
                        />)
                    })

                    return (
                        <g key={`trips_items_${value.id}`}>{tripsItems}</g>
                    )
                })}
            </g>*/}
        </svg>
    )
}

export default Trips