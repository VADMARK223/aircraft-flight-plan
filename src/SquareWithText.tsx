import {JSX, LegacyRef, useEffect, useRef} from "react";
import * as d3 from 'd3'

interface SquareWithTextProps {
    x: number
    y: number
    width: number
    height: number
    fill: string
}

export const SquareWithText = (props: SquareWithTextProps): JSX.Element => {
    const {x, y, width, height, fill} = props
    const svgRef: LegacyRef<any> = useRef<SVGSVGElement | undefined>()

    useEffect(() => {
        const svg = d3.select(svgRef.current)
        svg.append('rect')
            .attr('x', x)
            .attr('y', y)
            .attr('width', width)
            .attr('height', height)
            .attr('fill', fill)

        svg.append('text')
            .attr('x', x + width * 0.5)
            .attr('y', y + width * 0.5)
            .attr('fill', 'black')
            .attr('text-anchor', 'middle')
            .attr('dominant-baseline', 'middle')
            .text('Hello')

    }, [x, y, width, height, fill])

    return (
        <svg ref={svgRef} width={1300} height={650}/>
    )
}