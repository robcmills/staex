#include <iostream>
#include <cmath>
#include "mcts.h"
#include "staex.h"

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

		BoardState board = vector<vector<SquareState>>(
			board_size,
			vector<SquareState>(
				board_size,
				INITIAL_SQUARE_STATE
			)
		);

		int index_length = (board_size * board_size) - 1;
		int p1_token_index = index_length - log2(p1_token);
		int p2_token_index = index_length - log2(p2_token);

		for (int y=0; y<board_size; ++y) {
			for (int x=0; x<board_size; ++x) {
				int i = y * board_size + x;
				board[y][x].height = heights[i];
				if (i == p1_token_index) {
					board[y][x].token = 1;
				} else if (i == p2_token_index) {
					board[y][x].token = 2;
				}
				int square_mask = int(pow(2, index_length - i));
				if (square_mask & p1_squares) {
					board[y][x].owner = 1;
				} else if (square_mask & p2_squares) {
					board[y][x].owner = 2;
				}
			}
		}

		print_board(board, board_size);

		Staex staex(board_size, board);

		MCTS::ComputeOptions compute_options;
		compute_options.max_iterations = 1000;
		compute_options.verbose = false;
		compute_options.number_of_threads = 1;

		Staex::Move computer_move = MCTS::compute_move(staex, compute_options);
		std::cout << "computer_move:" << computer_move << std::endl;

		return 0;
	}
}
