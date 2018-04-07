import React from 'react'
import cn from 'classnames'

import Height from '../height/'
import './valid-stack-target.css'

const ValidStackTarget = ({ activePlayer, height, squareSize }) =>
	<div
		className={cn(
			'stackTarget',
			`player${activePlayer}StackTarget`,
		)}
	>
		<Height squareSize={squareSize}>{height}</Height>
	</div>

export default ValidStackTarget
