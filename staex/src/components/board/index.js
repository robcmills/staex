import React from 'react'

import Square from '../square/'
import './board.css'

const SQUARE_SIZE = 64
const BOARD_WIDTH = 4
const BOARD_HEIGHT = 4
const fileAndRanks = []
for (let x = 0; x < BOARD_WIDTH; x++) {
	for (let y = 0; y < BOARD_HEIGHT; y++) {
		fileAndRanks.push({ x, y })
	}
}

const Board = () =>
	<div
		className="board"
		style={{
			height: `${SQUARE_SIZE*BOARD_HEIGHT}px`,
			width: `${SQUARE_SIZE*BOARD_WIDTH}px`,
		}}
	>
	{
		fileAndRanks.map(({ x, y }) =>
			<Square file={x} rank={y} size={SQUARE_SIZE} />
		)
	}
	</div>

export default Board
