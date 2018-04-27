import createReducer from './create-reducer'
import initialState from './initial-state'
import { not, setCharAt } from './helpers'

export default createReducer(initialState, {
	STACK: (state, { binaryIndex }) => {
		const activePlayer = state.activePlayer
		const activePlayerKey = `player${activePlayer}Squares`
		const mask = parseInt(setCharAt('0000000000000000', binaryIndex, '1'), 2)
		const activePlayerSquares = state[activePlayerKey] | mask

		const inactivePlayerKey = `player${activePlayer === 1 ? 2 : 1}Squares`
		const unmask = not(mask)
		const inactivePlayerSquares = state[inactivePlayerKey] & unmask
		return {
			...state,
			activePlayer: state.activePlayer === 1 ? 2 : 1,
			[activePlayerKey]: activePlayerSquares,
			[inactivePlayerKey]: inactivePlayerSquares,
			squareHeights: [
				...state.squareHeights.slice(0, binaryIndex),
				state.squareHeights[binaryIndex] + 1,
				...state.squareHeights.slice(binaryIndex + 1, 16),
			],
		}
	},
	MOVE: (state, { binaryIndex }) => {
		const activePlayer = state.activePlayer
		const key = `player${activePlayer}Token`
		const val = parseInt(setCharAt('0000000000000000', binaryIndex, '1'), 2)
		return {
			...state,
			activePlayer: state.activePlayer === 1 ? 2 : 1,
			[key]: val,
		}
	},
})
