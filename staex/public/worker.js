/* eslint-disable no-undef */
importScripts('staex.em.js')

const BOARD_SIZE = 4

function convertGameStateToArgs({
	player1Squares,
	player2Squares,
	player1Token,
	player2Token,
	squareHeights,
}) {
	return [
		BOARD_SIZE,
		player1Squares,
		player2Squares,
		player1Token,
		player2Token,
		squareHeights,
	]
}

onmessage = function(event) {
	console.log('worker onmessage event.data (js):', event.data)
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
	console.log('onRuntimeInitialized')
	// wasm has been loaded, compiled and instantiated
	// we can now safely invoke exported methods
	Module['compute_move'] = function(
		BOARD_SIZE,
		player1Squares,
		player2Squares,
		player1Token,
		player2Token,
		squareHeights
	) {
		const typedArray = new Int32Array(squareHeights)
		const heapBytes = _arrayToHeap(typedArray)
		const result = Module.ccall(
			'compute_move',
			'number', // return type
			['number', 'number', 'number', 'number', 'number', 'number'], // argument types
			[
				BOARD_SIZE,
				player1Squares,
				player2Squares,
				player1Token,
				player2Token,
				heapBytes.byteOffset
			] // arguments
		);
		_freeArray(heapBytes);
		return result;
	}
}
