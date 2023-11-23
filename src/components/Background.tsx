/**
 * Компонент
 *
 * @author Markitanov Vadim
 * @since 22.11.2023
 */
import React, {JSX, LegacyRef, useEffect, useRef} from 'react';
import * as d3 from "d3";
import {
    DATE_ITEM_HEIGHT,
    DATE_ITEM_WIDTH,
    dates,
    FLIGHT_ITEM_HEIGHT,
    FLIGHT_ITEM_WIDTH,
    HEADER_HEIGHT
} from "../utils/consts";
import {useStore} from "effector-react";
import {$flights} from "../api/flight";

const Background = (): JSX.Element => {
    const flights = useStore($flights)
    const svgRef: LegacyRef<any> = useRef<SVGSVGElement | undefined>()
    const x = FLIGHT_ITEM_WIDTH
    const y = HEADER_HEIGHT + DATE_ITEM_HEIGHT
    const width = DATE_ITEM_WIDTH * dates.length
    const height = FLIGHT_ITEM_HEIGHT * flights.length
    const fill = 'white'

    useEffect(() => {
        const svg = d3.select(svgRef.current)
        svg.selectAll('*').remove()
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

    }, [x, y, width, height, flights]);

    return (
        <svg ref={svgRef}></svg>
    )
}

export default Background