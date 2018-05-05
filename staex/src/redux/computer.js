import MCTS from '../mcts/'
import Game from '../mcts/game'
import store from './store'

export function getComputerMove(state) {
	if (document.worker) {
		// Use Web Worker if possible
		// document.worker.postMessage('test')
		document.worker.postMessage({
			Game,
			MCTS,
			state
		})
		// worker.onmessage = function(e) {
		//   console.log('Result received from worker', e)
		// }
	} else {
		setTimeout(() => {
			const game = new Game({ initialState: state })
			const mcts = new MCTS({ game, rounds: 100000, timeout: 60000 })
			const move = mcts.getMove()
			store.dispatch(move)
		}, 10)
	}
}
