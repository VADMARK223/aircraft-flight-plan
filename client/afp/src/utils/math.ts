/**
 * @author Markitanov Vadim
 * @since 10.12.2024
 */
export const getRandomNumber = (min: number, max: number): number => {
	if (min > max) {
		throw new Error('Начальное значение должно быть меньше или равно конечному')
	}

	return Math.floor(Math.random() * (max - min)) + min
}
