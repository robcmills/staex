import React from 'react'
import _ from 'lodash'

import { indexToCoord } from '../../redux/helpers'
import Square from '../square/'

const Squares = ({ boardSize, squareSize }) =>
	_.range(0, boardSize * boardSize)
	.map(index =>
		<Square
			{...indexToCoord({ boardSize, index })}
			size={squareSize}
			key={index}
			index={index}
		/>)

export default Squares