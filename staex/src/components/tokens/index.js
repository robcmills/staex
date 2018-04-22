import React from 'react'

import magicConnect from '../../redux/magic-connect'
import {
	tokensSelector,
} from '../../redux/selectors'

import Token from './token'

const Tokens = ({ squareSize, tokens }) =>
	tokens.map((token, index) =>
		<Token {...token} squareSize={squareSize} key={index} />)

export default magicConnect({
	selectors: {
		tokens: tokensSelector,
	},
})(Tokens)