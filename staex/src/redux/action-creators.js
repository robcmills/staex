import store from './store'
import MCTS from '../mcts/'
import Game from '../mcts/game'

function getComputerMove(state) {
	const game = new Game({ initialState: state })
	const mcts = new MCTS({ game, rounds: 100000, timout: 60000 })
	const move = mcts.getMove()
	return move
}

export const stack = payload => {
	// Player move
	store.dispatch({ type: 'STACK', payload })

	// Computer move
	const computerMove = getComputerMove(store.getState())
	store.dispatch(computerMove)
}

export const move = payload => {
	// Player move
	store.dispatch({ type: 'MOVE', payload })

	// Computer move
	const computerMove = getComputerMove(store.getState())
	store.dispatch(computerMove)
}
