# `useState` greeting

`useState` hooks tell React to rerender a component anytime the `set` function
(2nd item returned from the array) of the hook is called and going to change
which will trigger a rerender and get the new value of state. Just reassinging a
value does not tell react to rerender.

## Extra credit

A controled input should not be `undefined` or `null` this will throw a warning
in this use case default to a string.
