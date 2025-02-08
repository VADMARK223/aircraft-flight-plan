/**
 * @author Markitanov Vadim
 * @since 08.02.2025
 */
import { createStore, createEvent } from 'effector'

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

export const zoomModeChanged = createEvent<ZoomMode>('Событие изменения масштабирования канвы.')

export const $canvas = createStore<CanvasStore>(defaultState)
$canvas.on(zoomModeChanged, (state, payload) => {
	return { ...state, mode: payload }
})
