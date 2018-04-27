import Game from './game'
import initialState from '../redux/initial-state'

fit('getPossibleMoves', () => {
	const game = new Game(initialState)
	const possibleMoves = game.getPossibleMoves()
	const expectedMoves = [
		{ action: 'STACK', index: 0 },
		{ action: 'STACK', index: 1 },
		{ action: 'STACK', index: 4 },
		{ action: 'MOVE', index: 1 },
		{ action: 'MOVE', index: 2 },
		{ action: 'MOVE', index: 3 },
		{ action: 'MOVE', index: 4 },
		{ action: 'MOVE', index: 8 },
		{ action: 'MOVE', index: 12 },
	]
	possibleMoves.map((move, index) =>
		expect(move).toEqual(expectedMoves[index]))
})