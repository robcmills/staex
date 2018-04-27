import Game from './game'
import initialState from '../redux/initial-state'

fit('getPossibleMoves', () => {
	const game = new Game(initialState)
	const possibleMoves = game.getPossibleMoves()
	const expectedMoves = [
		{ type: 'STACK', payload: { index: 0 } },
		{ type: 'STACK', payload: { index: 1 } },
		{ type: 'STACK', payload: { index: 4 } },
		{ type: 'MOVE', payload: { index: 1 } },
		{ type: 'MOVE', payload: { index: 2 } },
		{ type: 'MOVE', payload: { index: 3 } },
		{ type: 'MOVE', payload: { index: 4 } },
		{ type: 'MOVE', payload: { index: 8 } },
		{ type: 'MOVE', payload: { index: 12 } },
	]
	possibleMoves.map((move, index) =>
		expect(move).toEqual(expectedMoves[index]))
})