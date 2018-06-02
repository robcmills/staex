#include <iostream>
#include <cmath>
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
		std::cout << "p1_token_index:" << p1_token_index << std::endl;
		std::cout << "p2_token_index:" << p2_token_index << std::endl;

		for (int y=0; y<board_size; ++y) {
			for (int x=0; x<board_size; ++x) {
				int i = y * board_size + x;
				board[y][x].height = heights[i];
				if (i == p1_token_index) {
					board[y][x].token = 1;
				} else if (i == p2_token_index) {
					board[y][x].token = 2;
				}
			}
		}

		print_board(board, board_size);
		return 0;
	}
}
