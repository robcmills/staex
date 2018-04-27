import store from './store'

export const stack = payload => {
	// Player move
	store.dispatch({ type: 'STACK', payload })

	// Computer move
}

export const move = payload => {
	// Player move
	store.dispatch({ type: 'MOVE', payload })

	// Computer move
}
