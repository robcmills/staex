#include <cmath>
#include <ctime>
#include <limits>
#include <random>
#include <sstream>
#include <string>
#include <vector>

#include "staex.h"

using namespace std;

const int C = 2; // Exploration parameter
const float FLOAT_INFINITY = std::numeric_limits<float>::infinity();

namespace MCTS {

class Node {
	public:
		Staex staex;
		const int move;
		Node* const parent;
		int depth;
		int visits;
		int wins;
		std::vector<Node*> children;
		float ucb;

		Node(int move, Node* parent, Staex staex);

		void update_ucb();
		void add_children();
		Node* get_random_child(std::mt19937_64* random_engine);
		std::string to_string() const;
		std::string tree_to_string(int max_depth, int current_depth) const;
};

Node::Node(
	int move_,
	Node* parent_,
	Staex staex_
) :
	move(move_),
	parent(parent_),
	staex(staex_),
	visits(0),
	wins(0),
	ucb(FLOAT_INFINITY)
{}

void Node::update_ucb() {
	if (
		visits == 0 ||
		parent == nullptr ||
		parent->visits < 2
	) { return; }

	float exploitation = float(wins) / float(visits);
	float exploration = sqrt(C * log(float(parent->visits)) / float(visits));
	ucb = exploitation + exploration;
}

void Node::add_children() {
	for (auto action: staex.valid_actions) {
		auto child = new Node(action, this, staex);
		child->staex.perform_action(action);
		children.push_back(child);
	}
}

Node* Node::get_random_child(std::mt19937_64* engine) {
	std::uniform_int_distribution<std::size_t> distribution(0, children.size() - 1);
	int random_index = distribution(*engine);
	return children[random_index];
}

std::string Node::to_string() const {
	std::stringstream ss;
	ss << "m:" << move << " "
		<< "w/v:" << wins << "/" << visits << " "
		<< "p:" << staex.state.active_player << " "
		<< "u:" << ucb;
	return ss.str();
}

std::string Node::tree_to_string(int max_depth = 0, int current_depth = 1) const {
	std::stringstream ss;
	ss << to_string();
	if (max_depth > 0 && current_depth > max_depth) { return ss.str(); }
	for (auto child: children) {
		ss << endl;
		for (int i = 0; i < current_depth; ++i) { ss << "  "; }
		ss << child->tree_to_string(max_depth, current_depth + 1);
	}
	return ss.str();
}

class MCTS {
	public:
		int rounds;
		Node root_node;
		Node* current_node;
		int current_winner;
		std::mt19937_64 random_engine;
		std::uniform_int_distribution<int> distribution;

		MCTS(int rounds, Staex staex);

		bool should_continue() const;
		bool get_random_bool();
		void select();
		void expand();
		void playout();
		void propagate();
		int get_action();
};

MCTS::MCTS(
	int rounds_,
	Staex staex
) :
	rounds(rounds_),
	current_winner(0),
	root_node(*(new Node(0, nullptr, staex)))
{
	root_node.add_children();
	random_engine = std::mt19937_64(std::time(0));
	distribution = std::uniform_int_distribution<int>(0, 1);
}

bool MCTS::should_continue() const {
	return rounds > 0;
}

bool MCTS::get_random_bool() {
	return distribution(random_engine) > 0;
}

void MCTS::select() {
	current_node = &root_node;
	while (current_node->children.size() > 0 && should_continue()) {
		current_node = *std::max_element(
			current_node->children.begin(),
			current_node->children.end(),
			[this](Node* a, Node* b) {
				if (a->ucb == b->ucb) {
					return this->get_random_bool();
				}
				return a->ucb < b->ucb;
			}
		);
	}
}

void MCTS::expand() {
	if (current_node->staex.winner != 0) { return; }
	current_node->add_children();
	current_node = current_node->get_random_child(&random_engine);
}

void MCTS::playout() {
	Staex playout = current_node->staex.clone();
	while (playout.winner == 0 && should_continue()) {
		playout.perform_playout_action(&random_engine);
	}
	current_winner = playout.winner;
}

void MCTS::propagate() {
	while (current_node != nullptr && should_continue()) {
		current_node->visits++;
		if (current_node->staex.state.active_player != current_winner) {
			current_node->wins++;
		}
		current_node->update_ucb();
		current_node = current_node->parent;
	}
	current_winner = 0;
}

int MCTS::get_action() {
	while (should_continue()) {
		select();
		expand();
		if (current_winner == 0) { playout(); }
		propagate();
		rounds--;
	}
	return (*std::max_element(
		root_node.children.begin(),
		root_node.children.end(),
		[](Node* a, Node* b) {
			return a->visits < b->visits;
		}
	))->move;
}

}