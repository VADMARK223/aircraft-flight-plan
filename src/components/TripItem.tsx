/**
 * Компонент
 *
 * @author Markitanov Vadim
 * @since 22.11.2023
 */
import React, {JSX, LegacyRef, useEffect, useRef} from 'react';
import {FLIGHT_ITEM_HEIGHT} from "../utils/consts";
import * as d3 from "d3";
import {TripModel} from "../models/TripModel";

interface TripItemProps {
    data: TripModel
    x: number
    y: number
    width: number
    dragging?: boolean
}

const TripItem = (props: TripItemProps): JSX.Element => {
    const {data, x, y, width, dragging = false} = props
    const height = FLIGHT_ITEM_HEIGHT * 0.3
    const fill = 'white'
    const svgRef: LegacyRef<any> = useRef<SVGSVGElement | undefined>()

    useEffect(() => {
        const svg = d3.select(svgRef.current)
        svg.append('rect')
            .attr('x', x)
            .attr('y', y + (FLIGHT_ITEM_HEIGHT - height) * 0.5)
            .attr('width', width)
            .attr('height', height)
            .attr('stroke', dragging ? 'red' : 'green')
            .attr('fill', dragging ? 'red' : 'green')

        svg.append('text')
            .attr('x', x + 5)
            .attr('y', y + (FLIGHT_ITEM_HEIGHT - height) * 0.5)
            .attr('fill', 'white')
            .attr('text-anchor', 'start')
            .attr('dominant-baseline', 'hanging')
            .text(data.id)
    }, [data.id, dragging, x, y, width, height, fill])

    return (
        <g ref={svgRef}/>
    )
}

export default TripItem