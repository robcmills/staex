import React from 'react'

import './token.css'

const Token = ({ color, squareSize }) =>
	<div
		className="token"
		style={{
			background: color,
			height: `${squareSize*0.4}px`,
			width: `${squareSize*0.4}px`,
			right: `${squareSize*0.15}px`,
			bottom: `${squareSize*0.15}px`,
		}}
	/>

export default Token
