/* eslint-disable no-undef */
importScripts('staex.em.js')

function convertGameStateToArgs({
	player1Squares,
	player2Squares,
	player1Token,
	player2Token,
	squareHeights,
}) {
	return [
		Math.floor(Math.sqrt(squareHeights.length)), // boardSize
		player1Squares,
		player2Squares,
		player1Token,
		player2Token,
		squareHeights,
	]
}

onmessage = function(event) {
	const args = convertGameStateToArgs(event.data)
	const result = Module.compute_move(...args)
	postMessage(result)
}

onerror = function(error) {
	console.error('Worker error:', e.message)
}

function _arrayToHeap(typedArray) {
	var numBytes = typedArray.length * typedArray.BYTES_PER_ELEMENT;
	var ptr = Module._malloc(numBytes);
	var heapBytes = new Uint8Array(Module.HEAPU8.buffer, ptr, numBytes);
	heapBytes.set(new Uint8Array(typedArray.buffer));
	return heapBytes;
}

function _freeArray(heapBytes) {
	Module._free(heapBytes.byteOffset);
}

Module.onRuntimeInitialized = function() {
	Module['compute_move'] = function(
		boardSize,
		player1Squares,
		player2Squares,
		player1Token,
		player2Token,
		squareHeights
	) {
		const typedArray = new Int32Array(squareHeights)
		const heapBytes = _arrayToHeap(typedArray)
		const result = Module.ccall(
			'safe_compute_move',
			'number', // return type
			['number', 'number', 'number', 'number', 'number', 'number'], // argument types
			[
				boardSize,
				player1Squares,
				player2Squares,
				player1Token,
				player2Token,
				heapBytes.byteOffset
			] // arguments
		);
		_freeArray(heapBytes);
		const index = Math.abs(result) - 1
		const action = {
			type: result > 0 ? 'STACK' : 'MOVE',
			payload: { index },
		}
		return action
	}
	// wasm has been loaded, compiled and instantiated
	// we can now safely invoke exported methods
	postMessage({ type: 'ON_RUNTIME_INITIALIZED' })
}
