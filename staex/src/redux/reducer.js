import createReducer from './create-reducer'
// import { activePlayerTokensSelector } from './selectors'
import initialState from './initial-state'

export default createReducer(initialState, {
	// STACK: (state, { rank, file }) => {
	// 	const key = `${file}:${rank}`
	// 	return {
	// 		...state,
	// 		activePlayer: state.activePlayer === 1 ? 2 : 1,
	// 		board: {
	// 			...state.board,
	// 			[key]: {
	// 				...state.board[key],
	// 				owner: state.activePlayer,
	// 				height: (state.board[key].height || 0) + 1
	// 			},
	// 		},
	// 	}
	// },
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
