1. Use `.then` syntax for more concise syntax
2. Return early if not defined
3. Pulling multiple bits of state helps avoud multiple rerenders
4. Use error boundary component more at a component level.
5. To allow the error boundary to remount pass in a unique(key) so it does not
   get stuck and reset as key changes and re-render.(preferred to reset error
   boundary)