export const bitBoard = (...binaryStrings) => {
	console.log('binaryStrings', binaryStrings.join(''))
	return parseInt(binaryStrings.join(''), 2)
}