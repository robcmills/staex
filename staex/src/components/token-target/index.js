import React from 'react'
import cn from 'classnames'

import './token-target.css'

import magicConnect from '../../redux/magic-connect'
import { moveAction } from '../../redux/action-creators'

const TokenTarget = ({
	binaryIndex,
	move,
	owner,
	squareSize,
	x,
	y,
}) =>
	<div
		className={cn(
			'tokenTarget',
			`player${owner}TokenTarget`,
		)}
		onClick={() => move({ binaryIndex, owner })}
		style={{
			height: `${squareSize * 0.4}px`,
			width: `${squareSize * 0.4}px`,
			left: `${squareSize * x + squareSize * 0.36}px`,
			bottom: `${squareSize * y + squareSize * 0.15}px`,
		}}
	/>

export default magicConnect({
	actions: {
		move: moveAction,
	},
})(TokenTarget)
