import store from './store'
import { getComputerMove } from './computer'
import { winnerSelector } from './selectors'

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
