import store from './store'
import { winnerSelector } from './selectors'
import { getComputerMove } from './computer'

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
