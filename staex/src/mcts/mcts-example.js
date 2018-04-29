// https://medium.com/@quasimik/monte-carlo-tree-search-applied-to-letterpress-34f41c86e238

class MonteCarlo {
	/** Update the state to find the best move for. */
	update(state) {
		// TODO
	}
	/** Run simulations repeatedly, then return the best move. */
	getPlay(timeout) {
		// TODO
	}
	/** Simulate one game to completion from the current state. */
	runSimulation() {
		// TODO
	}
}

// https://github.com/OMerkel/UCThello

var node = root
var variantBoard = board.copy()

// Selection
while (node.unexamined.length === 0 && node.children.length > 0) {
	node = node.selectChild()
	variantBoard.doAction(node.action)
}

// Expansion
if (node.unexamined.length > 0) {
	var j = Math.floor(Math.random() * node.unexamined.length)
	variantBoard.doAction(node.unexamined[j])
	node = node.addChild(variantBoard, j)
}

/* Simulation */
var actions = variantBoard.getActions()
while(actions.length > 0) {
	variantBoard.doAction(actions[Math.floor(Math.random() * actions.length)])
	// ...
	actions = variantBoard.getActions()
}

// Backpropagation
var result = variantBoard.getResult()
while(node) {
	node.update(result)
	node = node.parentNode
}