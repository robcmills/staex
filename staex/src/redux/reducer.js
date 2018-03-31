const initialState = {
	activePlayer: 1,
	activeAction: 'stack',
	board: {
		'0:0': { color: 'darkseagreen', height: 1, token: 'lightgreen' },
		'1:0': {},
		'2:0': {},
		'3:0': {},
		'0:1': {},
		'1:1': {},
		'2:1': {},
		'3:1': {},
		'0:2': {},
		'1:2': {},
		'2:2': {},
		'3:2': {},
		'0:3': {},
		'1:3': {},
		'2:3': {},
		'3:3': { color: 'burlywood', height: 1, token: 'bisque' },
	},
}

export default function rootReducer(state = initialState, action) {
	switch (action.type) {
		// case FETCH_STUFF:
		//   console.log('FETCH_STUFF Action')
		//   return action;
		default:
			return state
	}
}
