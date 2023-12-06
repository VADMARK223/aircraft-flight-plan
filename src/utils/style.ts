/**
 * @author Markitanov Vadim
 * @since 06.12.2023
 */
export const isDarkTheme = getComputedStyle(document.documentElement).getPropertyValue('--isDarkTheme')
export const backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--backgroundColor')
export const textColor = getComputedStyle(document.documentElement).getPropertyValue('--textColor')
export const lineColor = getComputedStyle(document.documentElement).getPropertyValue('--lineColor')
export const greenColor = getComputedStyle(document.documentElement).getPropertyValue('--greenColor')
export const redColor = getComputedStyle(document.documentElement).getPropertyValue('--redColor')