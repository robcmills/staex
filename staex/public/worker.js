/* eslint-disable no-undef */
importScripts('staex.js')

onmessage = function(event) {
	console.log('Message from main:', event.data)
	const result = Module._myFunction(4, 5)
	postMessage('result from worker:' + result)
}

onerror = function(error) {
	console.error('Worker error: ', e.message)
}