import { playerColors } from './constants'

const initialState = {
	activePlayer: 1,
	activeAction: 'stack',
	board: {
		'0:0': {
			color: playerColors[1].squareColor,
			height: 1,
			token: playerColors[1].tokenColor,
		},
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
		'3:3': {
			color: playerColors[2].squareColor,
			height: 1,
			token: playerColors[2].tokenColor,
		},
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
