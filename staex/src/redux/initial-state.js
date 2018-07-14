const { bitBoard } = require('./helpers')
const b = bitBoard

/*
 0  1  2  3
 4  5  6  7
 8  9 10 11
12 13 14 15
*/

module.exports = {
	activePlayer: 1,
	player1Squares: b('0000 0000 0000 0000'),
	player2Squares: b('0000 0000 0000 0000'),
	player1Token: b('0000 0100 0000 0000'),
	player2Token: b('0000 0000 0010 0000'),
	squareHeights: [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0],
	isRuntimeInitialized: false,
}