import store from './store'
import MCTS from '../mcts/'
import Game from '../mcts/game'

function computerMove(state) {
	setTimeout(() => {
		const game = new Game({ initialState: state })
		const mcts = new MCTS({ game, rounds: 10000, timeout: 60000 })
		const move = mcts.getMove()
		store.dispatch(move)
	}, 10)
}

export const stack = payload => {
	// Player move
	store.dispatch({ type: 'STACK', payload })

	// Computer move
	computerMove(store.getState())
}

export const move = payload => {
	// Player move
	store.dispatch({ type: 'MOVE', payload })

	// Computer move
	computerMove(store.getState())
}
