import React from 'react'

import './token.css'
import { playerColors } from '../../redux/constants'

const Tokens = ({ squareSize, tokens }) => {
	const player = tokens.length ? tokens[0] : undefined
	return (
		<div
			className="token"
			style={{
				background: playerColors[player].token,
				height: `${squareSize*0.4}px`,
				width: `${squareSize*0.4}px`,
				right: `${squareSize*0.15}px`,
				bottom: `${squareSize*0.15}px`,
			}}
		/>
	)
}

export default Tokens
