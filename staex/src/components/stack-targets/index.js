import React from 'react'
import _ from 'lodash'

import StackTarget from '../stack-target/'

import magicConnect from '../../redux/magic-connect'
import {
	activePlayerSelector,
	stackTargetsSelector,
	winnerSelector,
} from '../../redux/selectors'

import { indexToCoord, toString16 } from '../../redux/helpers'

const StackTargets = ({
	activePlayer,
	boardSize,
	squareSize,
	stackTargets,
	winner,
}) =>
	activePlayer === 1 && !winner &&
	_.range(0, boardSize * boardSize)
	.map(index =>
		toString16(stackTargets)[index] === '1' ?
			<StackTarget
				{...indexToCoord({ boardSize, index })}
				size={squareSize}
				key={index}
				index={index}
			/> :
			null
	)

export default magicConnect({
	selectors: {
		activePlayer: activePlayerSelector,
		stackTargets: stackTargetsSelector,
		winner: winnerSelector,
	},
})(StackTargets)