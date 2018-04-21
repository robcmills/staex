import React from 'react'

import magicConnect from '../../redux/magic-connect'
import {
	squaresSelector,
} from '../../redux/selectors'

const Squares = ({ size, squares }) =>
	<div className="squares" />

export default magicConnect({
	selectors: {
		squares: squaresSelector,
	},
})(Squares)