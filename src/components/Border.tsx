/**
 * Компонент
 *
 * @author Markitanov Vadim
 * @since 23.11.2023
 */
import React, {JSX, LegacyRef, useEffect, useRef} from 'react';
import {
    DATE_ITEM_HEIGHT,
    DATE_ITEM_WIDTH,
    dates,
    FLIGHT_ITEM_HEIGHT,
    FLIGHT_ITEM_WIDTH,
    HEADER_HEIGHT
} from "../utils/consts";
import * as d3 from "d3";
import {useStore} from "effector-react";
import {$flights} from "../api/flight";
import {drawLine} from "../utils/utils";

const Border = (): JSX.Element => {
    const flights = useStore($flights)
    const svgRef: LegacyRef<any> = useRef<SVGSVGElement | undefined>()
    const x = FLIGHT_ITEM_WIDTH
    const y = HEADER_HEIGHT + DATE_ITEM_HEIGHT
    const width = DATE_ITEM_WIDTH * dates.length + FLIGHT_ITEM_WIDTH
    const height = FLIGHT_ITEM_HEIGHT * flights.length + HEADER_HEIGHT + DATE_ITEM_HEIGHT

    useEffect(() => {
        const svg = d3.select(svgRef.current)
        svg.selectAll('*').remove()
        drawLine(svg, x, y, width, y)
        drawLine(svg, width, y, width, height)
        drawLine(svg, width, height, x, height)
        drawLine(svg, x, height, x, y)

    }, [x, y, width, height]);

    return (
        <svg ref={svgRef}></svg>
    )
}

export default Border