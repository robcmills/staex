import React from 'react'

import StackTarget from '../stack-target/'

import magicConnect from '../../redux/magic-connect'
import { stackTargetsSelector } from '../../redux/selectors'

import { binaryToCartesianArray } from '../../redux/constants'
import { toString16 } from '../../redux/helpers'

const StackTargets = ({ size, stackTargets }) =>
	binaryToCartesianArray.map((coord, index) =>
		toString16(stackTargets)[index] === '1' ?
			<StackTarget {...coord} size={size} key={index} binaryIndex={index} /> :
			null
	)

export default magicConnect({
	selectors: {
		stackTargets: stackTargetsSelector,
	},
})(StackTargets)