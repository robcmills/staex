import { bitBoard as b } from './helpers'

/*
 1 	2  3  4
 5 	6  7  8
 9 10 11 12
13 14 15 16
*/

const squareHeights = [0,0,0,1, 0,0,0,0, 0,0,0,0, 1,0,0,0]

const player1Squares = b('0000 0000 0000 1000')
const player2Squares = b('0001 0000 0000 0000')

const player1Token = b('0000 0000 0000 1000')
const player2Token = b('0001 0000 0000 0000')

export default {
	activePlayer: 1,
	activeAction: 'stack',
	player1Squares,
	player2Squares,
	player1Token,
	player2Token,
	squareHeights,
}