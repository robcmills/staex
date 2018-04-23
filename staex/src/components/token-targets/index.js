import React from 'react'

import TokenTarget from '../token-target/'

import magicConnect from '../../redux/magic-connect'
import { tokenTargetsSelector } from '../../redux/selectors'

const TokenTargets = ({ squareSize, targets }) => targets.map((target, index) =>
	<TokenTarget {...target} squareSize={squareSize} key={index} />
)


export default magicConnect({
	selectors: {
		targets: tokenTargetsSelector,
	},
})(TokenTargets)