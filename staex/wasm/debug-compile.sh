# First install emscripten and activate compiler environment
# source ~/src/emsdk/emsdk_env.sh
em++ \
	-o ../public/staex.em.js \
	staex.cpp \
	-std=c++11 \
	-g4 \
	-s ALLOW_MEMORY_GROWTH=1 \
	-s ASSERTIONS=2 \
	-s SAFE_HEAP=1 \
	-s STACK_OVERFLOW_CHECK=2 \
	-s DISABLE_EXCEPTION_CATCHING=0 \
	-s WASM=1 \
	-s EXPORTED_FUNCTIONS="['_compute_move']" \
	-s EXTRA_EXPORTED_RUNTIME_METHODS="['ccall']"
