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