import { isRuntimeInitializedSelector } from './selectors'

export function getComputerMove(state) {
	if (isRuntimeInitializedSelector(state)) {
		document.worker.postMessage(state)
		return
	}
}
