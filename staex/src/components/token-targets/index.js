import React from 'react'

import TokenTarget from '../token-target/'

import magicConnect from '../../redux/magic-connect'
import {
	activePlayerSelector,
	tokenTargetsArraySelector,
} from '../../redux/selectors'

const TokenTargets = ({ activePlayer, squareSize, targets }) =>
	activePlayer === 1 ?
		targets.map((target, index) =>
			<TokenTarget {...target} squareSize={squareSize} key={index} />
		) :
		null

export default magicConnect({
	selectors: {
		activePlayer: activePlayerSelector,
		targets: tokenTargetsArraySelector,
	},
})(TokenTargets)