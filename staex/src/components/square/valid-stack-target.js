import React from 'react'

const ValidStackTarget = ({ squareSize }) =>
	<div
		style={{
			color: 'dimgray',
			position: 'absolute',
			top: `${Math.floor(squareSize*0.05)}px`,
			right: `${Math.floor(squareSize*0.1)}px`,
		}}
	>
		s
	</div>

export default ValidStackTarget
