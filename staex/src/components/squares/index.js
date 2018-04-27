import React from 'react'

import Square from '../square/'

import { binaryToCartesianArray } from '../../redux/constants'

const Squares = ({ size }) =>
	binaryToCartesianArray.map((coord, index) =>
		<Square {...coord} size={size} key={index} binaryIndex={index} />)

export default Squares