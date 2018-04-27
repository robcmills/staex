import Game from './game'
import initialState from '../redux/initial-state'
import { bitBoard as b } from '../redux/helpers'

it('getPossibleMoves', () => {
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

fit('performMove', () => {
	const game = new Game(initialState)
	game.performMove({ type: 'STACK', payload: { index: 0 } })
	const expectedState = {
		activePlayer: 2,
		player1Squares: b('1000 0000 0000 1000'),
		player2Squares: b('0001 0000 0000 0000'),
		player1Token: b('1000 0000 0000 0000'),
		player2Token: b('0000 0000 0000 0001'),
		squareHeights: [1,0,0,1, 0,0,0,0, 0,0,0,0, 1,0,0,0],
	}
	expect(game.state).toEqual(expectedState)
})