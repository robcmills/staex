import React from 'react'

import './height.css'

const Height = ({ children, color, squareSize }) =>
	<div
		className="height"
		style={{
			fontSize: `${Math.floor(squareSize/3)}px`,
			left: `${Math.floor(squareSize*0.15)}px`,
			top: `${Math.floor(squareSize*0.1)}px`,
		}}
	>
		{children}
	</div>

export default Height
