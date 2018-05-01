import React from 'react'

import StackTarget from '../stack-target/'

import magicConnect from '../../redux/magic-connect'
import {
	activePlayerSelector,
	stackTargetsSelector,
	winnerSelector,
} from '../../redux/selectors'

import { binaryToCartesianArray } from '../../redux/constants'
import { toString16 } from '../../redux/helpers'

const StackTargets = ({ activePlayer, size, stackTargets, winner }) =>
	activePlayer === 1 && !winner &&
	binaryToCartesianArray.map((coord, index) =>
		toString16(stackTargets)[index] === '1' ?
			<StackTarget {...coord} size={size} key={index} index={index} /> :
			null
	)

export default magicConnect({
	selectors: {
		activePlayer: activePlayerSelector,
		stackTargets: stackTargetsSelector,
		winner: winnerSelector,
	},
})(StackTargets)