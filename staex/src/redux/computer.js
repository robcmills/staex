/* eslint-disable no-undef */
import store from './store'
import mcts from '../mcts/singleton'

export function getComputerMove(state) {
	if (document.worker) {
		if (!document.worker.onmessage) {
			document.worker.onmessage = function(event) {
			  console.log('Result from worker:' + event.data)
			  // store.dispatch(e.data)
			}
			document.worker.onerror = function(error) {
				console.error('Worker error:', error.message)
			}
		}
		document.worker.postMessage(state)
	} else {
		setTimeout(() => {
			const move = mcts.getMove(store.getState())
			store.dispatch(move)
		}, 10)
	}
}
