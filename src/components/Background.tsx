/**
 * Компонент
 *
 * @author Markitanov Vadim
 * @since 22.11.2023
 */
import React, {LegacyRef, useEffect, useRef} from 'react';
import * as d3 from "d3";
import {
    DATE_ITEM_HEIGHT,
    DATE_ITEM_WIDTH,
    dates,
    FLIGHT_ITEM_HEIGHT,
    FLIGHT_ITEM_WIDTH,
    flights
} from "../utils/consts";

const Background = (): JSX.Element => {
    const x = FLIGHT_ITEM_WIDTH
    const y = DATE_ITEM_HEIGHT
    const width = DATE_ITEM_WIDTH * dates.length
    const height = FLIGHT_ITEM_HEIGHT * flights.length
    const fill = 'white'
    const svgRef: LegacyRef<any> = useRef<SVGSVGElement | undefined>()
    useEffect(() => {
        const svg = d3.select(svgRef.current)


        for (let j = 0; j < flights.length; j++) {
            for (let i = 0; i < dates.length; i++) {
                svg.append('rect')
                    .attr('x', x + DATE_ITEM_WIDTH * i)
                    .attr('y', y + FLIGHT_ITEM_HEIGHT * j)
                    .attr('width', DATE_ITEM_WIDTH)
                    .attr('height', FLIGHT_ITEM_HEIGHT)
                    .attr('stroke', 'black')
                    .attr('stroke-dasharray', [2, 3])
                    .attr('fill', fill)
            }
        }

        svg.append('rect')
            .attr('x', x)
            .attr('y', y)
            .attr('width', width)
            .attr('height', height)
            .attr('stroke', 'black')
            .attr('stroke-width', 3)
            .attr('fill', 'transparent')

    }, [x, y, width, height, fill])

    return (
        <g ref={svgRef}/>
    )
}

export default Background