import React from 'react'
import cn from 'classnames'

import './token-target.css'

import { move } from '../../redux/action-creators'

const TokenTarget = ({
	binaryIndex,
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
		onClick={() => move({ binaryIndex })}
		style={{
			height: `${squareSize * 0.4}px`,
			width: `${squareSize * 0.4}px`,
			left: `${squareSize * x + squareSize * 0.36}px`,
			bottom: `${squareSize * y + squareSize * 0.15}px`,
		}}
	/>

export default TokenTarget
