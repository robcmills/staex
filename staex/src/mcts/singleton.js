import MCTS from '.'
import Game from './game'

export default {
	mcts: null,
	getMove: function(state) {
		this.mcts = new MCTS({
			game: new Game({ initialState: state }),
			rounds: 1000,
			timeout: 10000,
		})
		this.move = this.mcts.getMove()
		return this.move
	},
}
