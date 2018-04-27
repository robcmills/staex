import React from 'react'

import StackTarget from '../stack-target/'

import magicConnect from '../../redux/magic-connect'
import {
	activePlayerSelector,
	stackTargetsSelector,
} from '../../redux/selectors'

import { binaryToCartesianArray } from '../../redux/constants'
import { toString16 } from '../../redux/helpers'

const StackTargets = ({ activePlayer, size, stackTargets }) => {
	if (activePlayer === 2) {
		return null
	}
	return binaryToCartesianArray.map((coord, index) =>
		toString16(stackTargets)[index] === '1' ?
			<StackTarget {...coord} size={size} key={index} index={index} /> :
			null
	)
}

export default magicConnect({
	selectors: {
		activePlayer: activePlayerSelector,
		stackTargets: stackTargetsSelector,
	},
})(StackTargets)