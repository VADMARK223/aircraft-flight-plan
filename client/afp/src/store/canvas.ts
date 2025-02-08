/**
 * @author Markitanov Vadim
 * @since 08.02.2025
 */
import { createStore } from 'effector'

export enum ZoomMode {
	DAYS, // В ячейке по одному дню
	WEEK, // В ячейке пол дня
	DAY, // В ячейке четверть дня
}

interface CanvasStore {
	mode: ZoomMode
}

const defaultState: CanvasStore = {
	mode: ZoomMode.DAY
}

export const $canvas = createStore<CanvasStore>(defaultState)
