export const bitBoard = binaryString =>
	parseInt(binaryString.replace(/\s/g, ''), 2)

export const not = int => parseInt((~int >>> 0).toString(2).slice(16, 32), 2)

export const toString16 = int => int.toString(2).padStart(16, 0)

export const setCharAt = (str, index, char) =>
	str.substr(0, index) + char + str.substr(index + 1)
