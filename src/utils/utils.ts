import dayjs from "dayjs";

/**
 * @author Markitanov Vadim
 * @since 23.11.2023
 */
export const getWeekCount = (current: dayjs.Dayjs): number => {
    const startOfYear = dayjs().startOf('year')
    return current.diff(startOfYear, 'weeks')
}