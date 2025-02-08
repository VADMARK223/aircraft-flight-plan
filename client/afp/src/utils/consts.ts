/**
 * Общие константы приложения
 *
 * @author Markitanov Vadim
 * @since 22.11.2023
 */
export const HEADER_HEIGHT = 30
export const DATE_ITEM_HEIGHT = 45
export const FLIGHT_CELL_WIDTH = 150 // Ширина ячейки рейсов
export const CELL_HEIGHT = 80 // Высота ячейки в рабочей области
export const ROUTE_ITEM_HEIGHT = CELL_HEIGHT * 0.47 // Высота прямоугольников перелетов.
export const DATE_ITEM_WIDTH = 180

/**
 * 6 - для Day
 * 12 - для Week
 * 24 - для Days
 * @type {number}
 */
export const HOURS_IN_CELL = 6 // Сколько часов в ячейке на канве
export const DATE_FORMAT = 'DD.MM.YYYY'
export const FULL_TIME_FORMAT = 'DD.MM.YYYY HH:mm'
