1. Only items of state that were being changed need useState (I went overkill
   and set state for winner, status and next value when only the sqaure where
   need)
2. When there is a computationally expensive function we can use lazy
   initialization. This is what the lazy initialization is all about. It allows
   you to put that code in a function:
