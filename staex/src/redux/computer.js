import store from './store'
import mcts from '../mcts/singleton'

export function getComputerMove(state) {
	if (document.worker) {
		if (!document.worker.onmessage) {
			console.log('!onmessage')
			document.worker.onmessage = function(event) {
			  console.log('Result received from worker', event.data)
			  // store.dispatch(e.data)
			}
			document.worker.onerror = function(error) {
				console.error('Worker error: ', error.message)
			}
		}
		document.worker.postMessage('game state from main')
	} else {
		setTimeout(() => {
			const move = mcts.getMove(store.getState())
			store.dispatch(move)
		}, 10)
	}
}
