import store from './store'
import mcts from '../mcts/singleton'
import { winnerSelector } from './selectors'

function getComputerMove(state) {
	setTimeout(() => {
		const move = mcts.getMove(state)
		store.dispatch(move)
	}, 10)
}

export const stack = payload => {
	// Player move
	store.dispatch({ type: 'STACK', payload })

	if (winnerSelector(store.getState())) return

	// Computer move
	getComputerMove(store.getState())
}

export const move = payload => {
	// Player move
	store.dispatch({ type: 'MOVE', payload })

	if (winnerSelector(store.getState())) return

	// Computer move
	getComputerMove(store.getState())
}
