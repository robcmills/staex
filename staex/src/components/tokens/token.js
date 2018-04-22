import React from 'react'

import './token.css'
import { playerColors } from '../../redux/constants'

const Token = ({ owner, squareSize, x, y }) =>
	<div
		className="token"
		style={{
			background: playerColors[owner].token,
			height: `${squareSize * 0.4}px`,
			width: `${squareSize * 0.4}px`,
			left: `${squareSize * x + squareSize * 0.36}px`,
			bottom: `${squareSize * y + squareSize * 0.15}px`,
		}}
	/>

export default Token
