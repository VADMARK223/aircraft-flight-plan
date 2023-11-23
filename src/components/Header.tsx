/**
 * Компонент заголовка
 *
 * @author Markitanov Vadim
 * @since 23.11.2023
 */
import React, {JSX, LegacyRef, useEffect, useRef} from 'react';
import {DATE_ITEM_WIDTH, dates, FLIGHT_ITEM_WIDTH, HEADER_HEIGHT} from "../utils/consts";
import * as d3 from "d3";

const Header = (): JSX.Element => {
    const svgRef: LegacyRef<any> = useRef<SVGSVGElement | undefined>()
    const x = FLIGHT_ITEM_WIDTH
    const y = 0
    const width = DATE_ITEM_WIDTH * dates.length
    const height = HEADER_HEIGHT
    const fill = 'white'

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
            .attr('x', x + 5)
            .attr('y', y + 5)
            .attr('fill', 'black')
            .attr('text-anchor', 'start')
            .attr('dominant-baseline', 'hanging')
            .text('ПЛАН ПОЛЕТОВ ВОЗДУШНЫХ СУДОВ')
    }, [x, y, width, height]);

    return (
        <svg ref={svgRef}></svg>
    )
}

export default Header