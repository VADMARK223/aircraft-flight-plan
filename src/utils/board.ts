/**
 * @author Markitanov Vadim
 * @since 08.12.2023
 */
import { Board } from '../models/Board'

export const getBoardIndexByBoardId = (boards: Board[], boardId: number): number => {
	let findBoardIndex = -1
	let stop = false
	for (let i = 0; i < boards.length; i++) {
		const board = boards[i]
		stop = board.id === boardId
		if (stop) {
			findBoardIndex = boards.indexOf(board)
			break
		}
	}

	return findBoardIndex
}