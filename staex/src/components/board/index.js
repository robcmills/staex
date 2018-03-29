import React from 'react'

import Square from '../square/'
import './board.css'

const BOARD_WIDTH = 3
const BOARD_HEIGHT = 3
const fileAndRanks = []
for (let x = 0; x < BOARD_WIDTH; x++) {
	for (let y = 0; y < BOARD_HEIGHT; y++) {
		fileAndRanks.push({ x, y })
	}
}

const Board = () =>
	<div className="board">
	{
		fileAndRanks.map(({ x, y }) =>
			<Square file={x} rank={y} />
		)
	}
	</div>

export default Board
