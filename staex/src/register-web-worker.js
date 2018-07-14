import store from './redux/store'
import { activePlayerSelector } from './redux/selectors'
import { getComputerMove } from './redux/computer'

const handlers = {
	ON_RUNTIME_INITIALIZED: (data) => {
		store.dispatch(data)
		// if human has performed an action while runtime was initializing
		// go ahead and start computing the computer's action
		const state = store.getState()
		if (activePlayerSelector(state) === 2) {
			getComputerMove(state)
		}
	},
}

export default function register() {
	document.worker.onmessage = function(event) {
		const handler = handlers[event.data.type] || store.dispatch
		handler(event.data)
	}
	document.worker.onerror = function(error) {
		console.error('web worker error', error.message)
	}
}
