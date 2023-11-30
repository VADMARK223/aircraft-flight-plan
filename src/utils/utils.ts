import dayjs from "dayjs";

/**
 * @author Markitanov Vadim
 * @since 23.11.2023
 */
export const getWeekCount = (current: dayjs.Dayjs): number => {
    const startOfYear = dayjs().startOf('year')
    return current.diff(startOfYear, 'weeks')
}

export const drawLine = (svg: any, x1: number, y1: number, x2: number, y2: number): any => {
    const result = svg.append('line')
    result.attr('stroke', 'black')
    result.attr('stroke-width', 3)
    result.attr('x1', x1)
    result.attr('y1', y1)
    result.attr('x2', x2)
    result.attr('y2', y2)
    return result
}
export const drawRect = (svg: any, x: number, y: number, width: number, height: number, stroke: string, fill: string, cursor: string): any => {
    const result = svg.append('rect')
    result.attr('x', x)
    result.attr('y', y)
    result.attr('width', width)
    result.attr('height', height)
    result.attr('stroke', stroke)
    result.attr('fill', fill)
    result.attr('cursor', cursor)
    return result
}

export const drawText = (svg: any, text: string, x: number, y: number, cursor: string): any => {
    svg.append('text')
        .attr('x', x)
        .attr('y', y)
        .attr('fill', 'black')
        .attr('font-weight', 'bold')
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'middle')
        .attr('cursor', cursor)
        .text(text)
}