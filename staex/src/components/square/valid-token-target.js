import React from 'react'
import cn from 'classnames'

import './valid-token-target.css'

const ValidTokenTarget = ({ activePlayer, squareSize }) =>
	<div
		className={cn(
			'tokenTarget',
			`player${activePlayer}TokenTarget`,
		)}
		style={{
			height: `${squareSize*0.4}px`,
			width: `${squareSize*0.4}px`,
			right: `${squareSize*0.15}px`,
			bottom: `${squareSize*0.15}px`,
		}}
	/>

export default ValidTokenTarget
