import { Currency } from './Currency'

/**
 * Интерфейс цены.
 *
 * @author Markitanov Vadim
 * @since 11.12.2023
 */
export interface Price {
	value: number
	currency: Currency
}