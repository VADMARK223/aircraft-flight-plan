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
    dates,
    FLIGHT_ITEM_HEIGHT,
    FLIGHT_ITEM_WIDTH,
    HEADER_HEIGHT,
    MINUTES_IN_CELL,
    RESIZE_STICK_WIDTH,
    SHOW_TRIP_ID,
    TRIP_ITEM_HEIGHT
} from "../utils/consts";
import dayjs from "dayjs";
import * as d3 from "d3";
import {TripViewModel} from "../models/TripViewModel";
import {TripType} from "../models/TripType";
import {useStore} from "effector-react";
import {$flights} from "../api/flight";
import {FlightModel} from "../models/FlightModel";
import {appendDateText, dateToX, drawRect, drawText} from "../utils/utils";
import {DragModel} from "../models/DragModel";
import {DragType} from "../models/DragType";
import {TripModel} from "../models/TripModel";

const Trips = (): JSX.Element => {
    const flights: FlightModel[] = useStore($flights)
    const svgRef: LegacyRef<any> = useRef<SVGSVGElement | undefined>()

    const [dragModel, setDragModel] = useState<DragModel | undefined>(undefined)
    const dragModelRef = useRef(dragModel)

    const [tripViewModels, setTripViewModels] = useState<TripViewModel[]>()
    const [curDragTrip, setCurDragTrip] = useState<TripViewModel | undefined>()
    const curDragTripRef = useRef(curDragTrip)

    const [shifts, setShifts] = useState({x: 0, y: 0})
    const shiftsRef = useRef(shifts);

    const height = FLIGHT_ITEM_HEIGHT * flights.length + HEADER_HEIGHT + DATE_ITEM_HEIGHT
    const width = FLIGHT_ITEM_WIDTH + DATE_ITEM_WIDTH * dates.length

    useEffect(() => {
        shiftsRef.current = shifts
    }, [shifts])

    useEffect(() => {
        dragModelRef.current = dragModel
    }, [dragModel])

    useEffect(() => {
        curDragTripRef.current = curDragTrip
    }, [curDragTrip])

    useEffect(() => {
        const svg = d3.select(svgRef.current)
        svg.call(d3.drag()
            .on('drag', event => {
                let newPosX = event.x + shiftsRef.current.x
                let newPosY = event.y + shiftsRef.current.y

                if (newPosX <= FLIGHT_ITEM_WIDTH) {
                    newPosX = FLIGHT_ITEM_WIDTH
                }

                if (dragModelRef.current && dragModelRef.current.trip) {
                    if (newPosX >= width - dragModelRef.current.trip.width) {
                        newPosX = width - dragModelRef.current.trip.width
                    }
                }

                if (newPosY <= HEADER_HEIGHT + DATE_ITEM_HEIGHT) {
                    newPosY = HEADER_HEIGHT + DATE_ITEM_HEIGHT
                }

                if (newPosY >= height - TRIP_ITEM_HEIGHT) {
                    newPosY = height - TRIP_ITEM_HEIGHT
                }

                const dragType = dragModelRef.current?.type
                const cur = curDragTripRef.current
                switch (dragType) {
                    case DragType.LEFT:
                        console.log('Move left.')

                        if (cur) {
                            updateCurDragTrip(cur.model, newPosX, cur.y, cur.width)
                        }
                        break

                    case DragType.CENTER:
                        console.log('Move center.')
                        if (cur) {
                            updateCurDragTrip(cur.model, newPosX, newPosY, cur.width)
                        }

                        break

                    case DragType.RIGHT:
                        console.log('Move right.')

                        if (cur) {
                            updateCurDragTrip(cur.model, newPosX, cur.y, cur.width)
                        }

                        break
                }
            })
            .on('start', event => {
                tripViewModels?.forEach(value => {
                    if (
                        event.x >= value.x && event.x <= value.x + value.width &&
                        event.y >= value.y && event.y <= value.y + TRIP_ITEM_HEIGHT
                    ) {
                        setDragModel({trip: value, type: dragModelRef.current?.type as DragType})
                        updateCurDragTrip(value.model, value.x, value.y, value.width)
                        setShifts({x: value.x - event.x, y: value.y - event.y})
                    }
                })
            })
            .on('end', _ => {
                if (curDragTripRef.current) {
                    const newStartX = curDragTripRef.current.x - FLIGHT_ITEM_WIDTH
                    const newStartMinutes = newStartX * MINUTES_IN_CELL / DATE_ITEM_WIDTH
                    const model = curDragTripRef.current?.model
                    const diffMinutes = dayjs(model.endDate).diff(model.startDate, 'minutes')
                    model.startDate = dayjs().startOf('day').add(newStartMinutes, 'minutes')
                    model.endDate = dayjs().startOf('day').add(newStartMinutes + diffMinutes, 'minutes')
                }

                setDragModel(undefined)
                setCurDragTrip(undefined)
            })
        )
    }, [tripViewModels, shiftsRef, height, width, flights, curDragTrip]);

    useEffect(() => {
        const svg = d3.select(svgRef.current)

        // Очищаем все
        svg.selectAll('*').remove()

        const temp: TripViewModel[] = []
        flights.forEach((value, index) => {
            if (!value.trips) {
                return undefined
            }
            value.trips.forEach(tripModel => {
                const tripDurationMinutes = tripModel.endDate.diff(tripModel.startDate, 'minutes')
                const tripWidth = DATE_ITEM_WIDTH / MINUTES_IN_CELL * tripDurationMinutes
                let tripX1: number = 0
                let tripX2: number = 0
                let tripY: number = 0
                const isDragging = tripModel.id === dragModelRef.current?.trip.model.id
                const cursor: string = isDragging ? 'grabbing' : 'grab'
                const isDefault = tripModel.type === TripType.DEFAULT

                if (isDragging) {
                    if (curDragTripRef.current) {
                        tripX1 = curDragTripRef.current.x
                        tripX2 = dateToX(tripModel.endDate)
                        tripY = curDragTripRef.current.y
                    }
                } else {
                    tripX1 = dateToX(tripModel.startDate)
                    tripX2 = dateToX(tripModel.endDate)
                    tripY = HEADER_HEIGHT + DATE_ITEM_HEIGHT + FLIGHT_ITEM_HEIGHT * index + (FLIGHT_ITEM_HEIGHT - TRIP_ITEM_HEIGHT) * 0.5
                }

                const tripViewModel: TripViewModel = {
                    model: tripModel,
                    x: tripX1,
                    y: tripY,
                    width: tripWidth
                }

                svg.append('rect')
                    .attr('x', tripX1)
                    .attr('y', tripY)
                    .attr('width', tripWidth)
                    .attr('height', TRIP_ITEM_HEIGHT)
                    .attr('stroke', isDefault ? 'green' : 'orange')
                    .attr('fill', isDragging ? 'red' : isDefault ? 'lightgreen' : 'orange')
                    .attr('cursor', cursor)
                    .on('mousedown', function (event: any) {
                        // updateCurDragTrip(tripModel, tripViewModel.x,tripViewModel.y, tripViewModel.width)
                        const shiftX = tripViewModel.x - event.x
                        const shiftY = tripViewModel.y - event.y
                        setShifts({x: shiftX, y: shiftY})
                        setDragModel({trip: tripViewModel, type: DragType.CENTER})
                    })

                if (SHOW_TRIP_ID) {
                    svg.append('text')
                        .attr('x', tripX1 + 5)
                        .attr('y', tripY)
                        .attr('fill', 'white')
                        .attr('text-anchor', 'start')
                        .attr('dominant-baseline', 'hanging')
                        .attr('cursor', cursor)
                        .text(tripModel.id)
                }

                if (!isDefault) {
                    drawText(svg, 'Тех. обслуживание', tripX1 + tripWidth * 0.5, tripY + TRIP_ITEM_HEIGHT * 0.5 + 1, cursor)
                }

                const leftStick: any = drawRect(svg, tripX1, tripY, RESIZE_STICK_WIDTH, TRIP_ITEM_HEIGHT, 'blue', 'blue', 'ew-resize')
                leftStick.on('mousedown', function () {
                    setDragModel({trip: tripViewModel, type: DragType.LEFT})
                })
                const rightStick: any = drawRect(svg, tripX1 + tripWidth - RESIZE_STICK_WIDTH, tripY, RESIZE_STICK_WIDTH, TRIP_ITEM_HEIGHT, 'blue', 'blue', 'ew-resize')
                rightStick.on('mousedown', function () {
                    setDragModel({trip: tripViewModel, type: DragType.RIGHT})
                })

                drawRect(svg, tripX1, tripY, RESIZE_STICK_WIDTH * 0.5, TRIP_ITEM_HEIGHT, 'red', 'red', 'auto')
                drawRect(svg, tripX2, tripY, RESIZE_STICK_WIDTH * 0.5, TRIP_ITEM_HEIGHT, 'brown', 'brown', 'auto')

                appendDateText(svg, tripX1, tripY, tripModel.startDate)
                appendDateText(svg, tripX1 + tripWidth, tripY, tripModel.endDate)
                temp.push(tripViewModel)
            })
        })
        setTripViewModels(temp)

    }, [flights, curDragTrip])

    const updateCurDragTrip = (model: TripModel, x: number, y: number, width: number): void => {
        setCurDragTrip({model: model, x: x, y: y, width: width})
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