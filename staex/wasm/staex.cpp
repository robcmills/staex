#include <iostream>
#include <cmath>

#include "maps.h"
#include "mcts.h"

extern "C" {
	int compute_move(
		int board_size,
		int p1_squares,
		int p2_squares,
		int p1_token,
		int p2_token,
		int* heights
	) {
		std::cout << "compute_move (cpp)" << std::endl;

		int const board_length = board_size * board_size;
		map<int,int> pow_map = build_pow_map(board_length);
		map<int,int> adjacents_map = build_adjacents_map(board_size, &pow_map);
		map<int,int> moves_map = build_moves_map(board_size, &pow_map);

		std::vector<int> heights_vector;
		heights_vector.reserve(board_length);
		for (int i = 0; i < board_length; ++i) {
			heights_vector.push_back(heights[i]);
		}
		StaexState const staex_state = {
			2, // active_player
			9, // game_end_score
			p1_squares, // player1_squares
			p1_token, // player1_token
			p2_squares, // player2_squares
			p2_token, // player2_token
			heights_vector
		};
		Staex staex(staex_state, &pow_map, &adjacents_map, &moves_map);
		MCTS::MCTS mcts(10, staex);

		int const action = mcts.get_action();
		// Convert action to ascending index
		int const ascending_action = action > 0
			? board_length - action
			: board_length + action;
		std::cout << "ascending_action:" << ascending_action << std::endl;
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
}
