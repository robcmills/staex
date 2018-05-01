import React from 'react'

import TokenTarget from '../token-target/'

import magicConnect from '../../redux/magic-connect'
import {
	activePlayerSelector,
	tokenTargetsArraySelector,
	winnerSelector,
} from '../../redux/selectors'

const TokenTargets = ({ activePlayer, squareSize, targets, winner }) =>
	activePlayer === 1 && !winner &&
		targets.map((target, index) =>
			<TokenTarget {...target} squareSize={squareSize} key={index} />
		)

export default magicConnect({
	selectors: {
		activePlayer: activePlayerSelector,
		targets: tokenTargetsArraySelector,
		winner: winnerSelector,
	},
})(TokenTargets)