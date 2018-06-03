/* eslint-disable no-undef */
import store from './store'
import mcts from '../mcts/singleton'

export function getComputerMove(state) {
	if (document.worker) {
		if (!document.worker.onmessage) {
			document.worker.onmessage = function(event) {
				console.log('Result from worker:' + event.data)
				const result = event.data
				const index = Math.abs(result) - 1
				const action = {
					type: result > 0 ? 'STACK' : 'MOVE',
					payload: { index },
				}
				store.dispatch(action)
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
