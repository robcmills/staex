import React from 'react'

import Tree from '../tree/'
import Board from '../board/'

const Router = () => {
	switch(window.location.hash) {
		case '#tree':
			return <Tree />
			break
		default:
			return <Board />
	}
}

export default Router
