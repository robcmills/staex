import React from 'react'
import _ from 'lodash'

import StackTarget from '../stack-target/'

import magicConnect from '../../redux/magic-connect'
import {
	activePlayerSelector,
	powerMapSelector,
	stackTargetsSelector,
	winnerSelector,
} from '../../redux/selectors'

import { indexToCoord } from '../../redux/helpers'

const StackTargets = ({
	activePlayer,
	boardSize,
	powerMap,
	squareSize,
	stackTargets,
	winner,
}) =>
	activePlayer === 1 && !winner &&
	_.range(0, boardSize * boardSize)
	.map(index =>
		stackTargets & powerMap[boardSize * boardSize - index - 1] ?
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
		powerMap: powerMapSelector,
		stackTargets: stackTargetsSelector,
		winner: winnerSelector,
	},
})(StackTargets)