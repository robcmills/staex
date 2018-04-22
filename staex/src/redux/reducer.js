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
		}
	},
	// MOVE: (state, { rank, file }) => {
	// 	const key = `${file}:${rank}`
	// 	const activePlayerTokens = activePlayerTokensSelector(state)
	// 	const activePlayerToken = activePlayerTokens[0]
	// 	return {
	// 		...state,
	// 		activePlayer: state.activePlayer === 1 ? 2 : 1,
	// 		board: {
	// 			...state.board,
	// 			[key]: {
	// 				...state.board[key],
	// 				tokens: state.board[key].tokens
	// 					.concat(state.activePlayer),
	// 			},
	// 			[activePlayerToken.location]: {
	// 				...state.board[activePlayerToken.location],
	// 				tokens: state.board[key].tokens
	// 					.filter(token => token !== state.activePlayer),
	// 			},
	// 		},
	// 	}
	// },
})
