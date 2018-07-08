#include <iostream>
#include <cmath>

#include "maps.h"
#include "mcts.h"

using namespace std;

int compute_move(
	int board_size,
	int p1_squares,
	int p2_squares,
	int p1_token,
	int p2_token,
	int* heights
) {
	cout << "compute_move (cpp)" << endl;

	int const board_length = board_size * board_size;
	map<int,int> pow_map = build_pow_map(board_length);
	map<int,int> adjacents_map = build_adjacents_map(board_size, &pow_map);
	map<int,int> moves_map = build_moves_map(board_size, &pow_map);
	// for (const auto &m : moves_map) {
	// 	std::cout << "moves_map[" << m.first << "] = " << m.second << '\n';
	// }

	std::vector<int> heights_vector(board_length, 0);
	// Reverse heights which is ascending indices
	for (int i = 0; i < board_length; ++i) {
		heights_vector[board_length - i - 1] = heights[i];
	}

	StaexState const staex_state = {
		2, // active_player
		10, // game_end_score
		p1_squares, // player1_squares
		p1_token, // player1_token
		p2_squares, // player2_squares
		p2_token, // player2_token
		heights_vector
	};
	Staex staex(staex_state, &pow_map, &adjacents_map, &moves_map);
	MCTS::MCTS mcts(1000, staex);

	int const action = mcts.get_action();
	cout << mcts.root_node.tree_to_string(1) << endl;
	cout << "action: " << action << endl;
	// Convert action to ascending index
	int const ascending_action = action > 0
		? board_length - action + 1
		: (board_length + action) * -1 - 1;
	return ascending_action;
}

int safe_compute_move(
	int board_size,
	int p1_squares,
	int p2_squares,
	int p1_token,
	int p2_token,
	int* heights
) {
	int result = 0;
	try {
		result = compute_move(
			board_size,
			p1_squares,
			p2_squares,
			p1_token,
			p2_token,
			heights
		);
	} catch (std::runtime_error& error) {
		std::cerr << "ERROR: " << error.what() << std::endl;
		return 0;
	}
	return result;
};

int main() {
	int heights [16] = { 1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0 };
	int result = safe_compute_move(4, 32768, 32, 32768, 1, heights);
	cout << "result: " << result << endl;
}
