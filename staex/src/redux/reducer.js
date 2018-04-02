const initialState = {
	activePlayer: 1,
	activeAction: 'stack',
	board: {
		'0:0': { owner: 1, height: 1, tokens: [1] },
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
		'3:3': { owner: 2, height: 1, tokens: [2] },
	},
}

export default function rootReducer(state = initialState, action) {
	switch (action.type) {
	default:
		return state
	}
}
