/**
 * Компонент информационной панели
 *
 * @author Markitanov Vadim
 * @since 22.11.2023
 */
import React, {JSX, LegacyRef, useEffect, useRef} from 'react';
import * as d3 from "d3";
import {DATE_ITEM_HEIGHT, FLIGHT_ITEM_WIDTH, HEADER_HEIGHT} from "../utils/consts";
import dayjs from "dayjs";
import {getWeekCount} from "../utils/utils";

const InfoPanel = (): JSX.Element => {
    const svgRef: LegacyRef<any> = useRef<SVGSVGElement | undefined>()
    const x = 0
    const y = 0
    const width = FLIGHT_ITEM_WIDTH
    const height = DATE_ITEM_HEIGHT + HEADER_HEIGHT
    const fill = 'white'
    const now = dayjs()

    useEffect(() => {
        const svg = d3.select(svgRef.current)

        svg.append('rect')
            .attr('x', x)
            .attr('y', y)
            .attr('width', width)
            .attr('height', height)
            .attr('stroke', 'black')
            .attr('fill', fill)
        svg.append('text')
            .attr('x', x + width * 0.5)
            .attr('y', y + height * 0.5)
            .attr('fill', 'black')
            .attr('text-anchor', 'middle')
            .attr('dominant-baseline', 'middle')
            .text(now.format('DD.MM.YYYY HH:mm'))
        svg.append('text')
            .attr('x', x + width * 0.5)
            .attr('y', y + height - 8)
            .attr('fill', 'black')
            .attr('text-anchor', 'middle')
            .attr('dominant-baseline', 'auto')
            .attr('font-size', 14)
            .text(`Week ${getWeekCount(now)}`)
    }, [x, y, width, height, now]);

    return (
        <svg ref={svgRef}></svg>
    )
}

export default InfoPanel