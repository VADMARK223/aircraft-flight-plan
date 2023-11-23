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
            .attr('x', x + 5)
            .attr('y', y + 5)
            .attr('fill', data.type ? data.type : 'black')
            .attr('font-weight', 'bold')
            .attr('text-anchor', 'start')
            .attr('dominant-baseline', 'hanging')
            .text(data.name)
    }, [data.name, x, y, width, height, fill, data.type])

    return (
        <g ref={svgRef}/>
    )
}

export default FlightItem