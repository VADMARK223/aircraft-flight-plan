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
import {drawRect, drawText} from "../utils/utils";
import {DragModel} from "../models/DragModel";
import {DragType} from "../models/DragType";

const Trips = (): JSX.Element => {
    const flights: FlightModel[] = useStore($flights)
    const svgRef: LegacyRef<any> = useRef<SVGSVGElement | undefined>()

    const [dragModel, setDragModel] = useState<DragModel | undefined>(undefined)
    const dragModelRef = useRef(dragModel)

    const [tripViewModels, setTripViewModels] = useState<TripViewModel[]>()
    const [startPos, setStartPos] = useState({x: 0, y: 0})
    const startPosRef = useRef(startPos)

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
        startPosRef.current = startPos
    }, [startPos])

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
                switch (dragType) {
                    case DragType.LEFT:
                        console.log('Move left.')

                        const currentTrip = dragModelRef.current?.trip.data
                        const newStartX = startPosRef.current.x - FLIGHT_ITEM_WIDTH
                        const newStartMinutes = newStartX * MINUTES_IN_CELL / DATE_ITEM_WIDTH

                        if (currentTrip) {
                            currentTrip.startDate = dayjs().startOf('day').add(newStartMinutes, 'minutes')
                        }

                        setStartPos({x: newPosX, y: startPosRef.current.y});
                        break

                    case DragType.CENTER:
                        console.log('Move center.')
                        setStartPos({x: newPosX, y: newPosY});
                        break

                    case DragType.RIGHT:
                        console.log('Move right.')

                        setStartPos({x: newPosX, y: startPosRef.current.y});
                        break
                }
            })
            .on('start', event => {
                tripViewModels?.forEach(value => {
                    if (
                        event.x >= value.x && event.x <= value.x + value.width &&
                        event.y >= value.y && event.y <= value.y + value.height
                    ) {
                        setDragModel({trip: value, type: dragModelRef.current?.type as DragType})
                        setStartPos({x: value.x, y: value.y})
                        setShifts({x: value.x - event.x, y: value.y - event.y})
                    }
                })
            })
            .on('end', _ => {
                const currentTrip = dragModelRef.current?.trip.data
                const newStartX = startPosRef.current.x - FLIGHT_ITEM_WIDTH
                const newStartMinutes = newStartX * MINUTES_IN_CELL / DATE_ITEM_WIDTH

                if (currentTrip) {
                    const diffMinutes = dayjs(currentTrip.endDate).diff(currentTrip.startDate, 'minutes')
                    currentTrip.startDate = dayjs().startOf('day').add(newStartMinutes, 'minutes')
                    currentTrip.endDate = dayjs().startOf('day').add(newStartMinutes + diffMinutes, 'minutes')
                }

                setDragModel(undefined)
                setStartPos({x: 0, y: 0})
            })
        )
    }, [startPos.x, startPos.y, tripViewModels, shiftsRef, height, width, flights]);

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
                const tripDurationMinutes = tripModel.endDate.diff(tripModel.startDate, 'minutes')
                const tripWidth = DATE_ITEM_WIDTH / MINUTES_IN_CELL * tripDurationMinutes
                let tripX
                let tripY
                const isDragging = tripModel.id === dragModelRef.current?.trip.data.id
                const cursor: string = isDragging ? 'grabbing' : 'grab'
                const isDefault = tripModel.type === TripType.DEFAULT
                if (isDragging) {
                    tripX = startPos.x
                    tripY = startPos.y
                } else {
                    const diffMinutes = tripModel.startDate.diff(startDay, 'minutes')
                    tripX = FLIGHT_ITEM_WIDTH + DATE_ITEM_WIDTH / MINUTES_IN_CELL * diffMinutes
                    tripY = HEADER_HEIGHT + DATE_ITEM_HEIGHT + FLIGHT_ITEM_HEIGHT * index + (FLIGHT_ITEM_HEIGHT - TRIP_ITEM_HEIGHT) * 0.5
                }

                const tripViewModel: TripViewModel = {
                    data: tripModel,
                    x: tripX,
                    y: tripY,
                    width: tripWidth,
                    height: TRIP_ITEM_HEIGHT
                }

                svg.append('rect')
                    .attr('x', tripX)
                    .attr('y', tripY)
                    .attr('width', tripWidth)
                    .attr('height', TRIP_ITEM_HEIGHT)
                    .attr('stroke', isDefault ? 'green' : 'orange')
                    .attr('fill', isDragging ? 'red' : isDefault ? 'lightgreen' : 'orange')
                    .attr('cursor', cursor)
                    .on('mousedown', function (event: any) {
                        setStartPos({x: tripViewModel.x, y: tripViewModel.y})
                        const shiftX = tripViewModel.x - event.x
                        const shiftY = tripViewModel.y - event.y
                        setShifts({x: shiftX, y: shiftY})
                        setDragModel({trip: tripViewModel, type: DragType.CENTER})
                    })

                if (SHOW_TRIP_ID) {
                    svg.append('text')
                        .attr('x', tripX + 5)
                        .attr('y', tripY)
                        .attr('fill', 'white')
                        .attr('text-anchor', 'start')
                        .attr('dominant-baseline', 'hanging')
                        .attr('cursor', cursor)
                        .text(tripModel.id)
                }

                if (!isDefault) {
                    drawText(svg, 'Тех. обслуживание', tripX + tripWidth * 0.5, tripY + TRIP_ITEM_HEIGHT * 0.5 + 1, cursor)
                }

                const leftStick: any = drawRect(svg, tripX, tripY, RESIZE_STICK_WIDTH, TRIP_ITEM_HEIGHT, 'blue', 'blue', 'ew-resize')
                leftStick.on('mousedown', function () {
                    setDragModel({trip: tripViewModel, type: DragType.LEFT})
                })
                const rightStick: any = drawRect(svg, tripX + tripWidth - RESIZE_STICK_WIDTH, tripY, RESIZE_STICK_WIDTH, TRIP_ITEM_HEIGHT, 'blue', 'blue', 'ew-resize')
                rightStick.on('mousedown', function () {
                    setDragModel({trip: tripViewModel, type: DragType.RIGHT})
                })

                appendDateText(svg, tripX, tripY, tripModel.startDate)
                appendDateText(svg, tripX + tripWidth, tripY, tripModel.endDate)
                temp.push(tripViewModel)
            })
        })
        setTripViewModels(temp)

    }, [flights, startPos.x, startPos.y])

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