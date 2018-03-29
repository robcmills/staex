// import { combineReducers } from 'redux'

// export default combineReducers({
//   stuff
// })

const initialState = {
	board: {
		'0:0': { color: 'darkseagreen' },
		'1:0': {},
		'2:0': {},
		'0:1': {},
		'1:1': {},
		'2:1': {},
		'0:2': {},
		'1:2': {},
		'2:2': { color: 'burlywood' },
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
