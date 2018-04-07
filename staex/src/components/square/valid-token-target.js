import React from 'react'
import cn from 'classnames'

import './valid-token-target.css'

import magicConnect from '../../redux/magic-connect'
import { activePlayerSelector } from '../../redux/selectors'
import { moveAction } from '../../redux/action-creators'

const ValidTokenTarget = ({
	activePlayer,
	move,
	squareSize,
	rank,
	file,
}) =>
	<div
		className={cn(
			'tokenTarget',
			`player${activePlayer}TokenTarget`,
		)}
		onClick={() => move({ rank, file })}
		style={{
			height: `${squareSize*0.4}px`,
			width: `${squareSize*0.4}px`,
			right: `${squareSize*0.15}px`,
			bottom: `${squareSize*0.15}px`,
		}}
	/>

export default magicConnect({
	selectors: {
		activePlayer: activePlayerSelector,
	},
	actionCreators: {
		move: moveAction,
	},
})(ValidTokenTarget)
