import createReducer from './create-reducer'
import initialState from './initial-state'
import { setCharAt } from './helpers'

export default createReducer(initialState, {
	STACK: (state, { activePlayer, binaryIndex }) => {
		const key = `player${activePlayer}Squares`
		const mask = parseInt(setCharAt('0000000000000000', binaryIndex, '1'), 2)
		const val = state[key] | mask
		return {
			...state,
			activePlayer: state.activePlayer === 1 ? 2 : 1,
			[key]: val,
			squareHeights: [
				...state.squareHeights.slice(0, binaryIndex),
				state.squareHeights[binaryIndex] + 1,
				...state.squareHeights.slice(binaryIndex + 1, 16),
			],
		}
	},
	MOVE: (state, { binaryIndex, owner }) => {
		const key = `player${owner}Token`
		const val = parseInt(setCharAt('0000000000000000', binaryIndex, '1'), 2)
		return {
			...state,
			activePlayer: state.activePlayer === 1 ? 2 : 1,
			[key]: val,
		}
	},
})
