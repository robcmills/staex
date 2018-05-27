/* eslint-disable no-undef */
onmessage = function(event) {
	console.log('Message received from main in worker.js:', event.data)
	postMessage('result from worker')
}

onerror = function(error) {
	console.error('Worker error: ', e.message)
}