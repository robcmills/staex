import React from 'react'

import Square from '../square/'

import magicConnect from '../../redux/magic-connect'
import {
	squaresSelector,
} from '../../redux/selectors'

import { binaryToCartesianArray } from '../../redux/constants'
import { toString16 } from '../../redux/helpers'

const Squares = ({ size, squares }) =>
	binaryToCartesianArray.map((coord, index) =>
		toString16(squares)[index] === '1' ?
			<Square {...coord} size={size} key={index} binaryIndex={index} /> :
			null
	)

export default magicConnect({
	selectors: {
		squares: squaresSelector,
	},
})(Squares)