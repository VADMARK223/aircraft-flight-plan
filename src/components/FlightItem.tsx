/**
 * Компонент
 *
 * @author Markitanov Vadim
 * @since 22.11.2023
 */
import {JSX, LegacyRef, useEffect, useRef} from 'react';
import * as d3 from "d3";
import {FlightModel} from "../models/FlightModel";

interface FlightItemProps {
    data: FlightModel
    x: number
    y: number
    width: number
    height: number
    fill?: string
}

const FlightItem = (props: FlightItemProps): JSX.Element => {
    const {data, x, y, width, height, fill = 'white'} = props
    const svgRef: LegacyRef<any> = useRef<SVGSVGElement | undefined>()

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
            .text(data.name)

    }, [data.name, x, y, width, height, fill])

    return (
        <g ref={svgRef}/>
    )
}

export default FlightItem