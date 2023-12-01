import dayjs from "dayjs";
import {DATE_ITEM_WIDTH, FLIGHT_ITEM_WIDTH, MINUTES_IN_CELL} from "./consts";

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

export const appendDateText = (svg: any, translateX: number, translateY: number, date: dayjs.Dayjs) => {
    const endDateContainer = svg.append('g')
    endDateContainer.attr('transform', `translate(${translateX},${translateY})`)
    endDateContainer.append('text')
        .attr('font-size', 14)
        .attr('fill', 'black')
        .attr('transform', `rotate(-16)`)
        .text(date.format('HH:mm'))
}

export const dateToX = (date: dayjs.Dayjs): number => {
    const startDay = dayjs().startOf('day')
    return FLIGHT_ITEM_WIDTH + DATE_ITEM_WIDTH / MINUTES_IN_CELL * date.diff(startDay, 'minutes')
}

export const xToDate = (x: number): dayjs.Dayjs => {
    const newStartX = x - FLIGHT_ITEM_WIDTH
    const newStartMinutes = newStartX * MINUTES_IN_CELL / DATE_ITEM_WIDTH
    return dayjs().startOf('day').add(newStartMinutes, 'minutes')
}