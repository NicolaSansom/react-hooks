1. DevTools should expect reg to be undefined but when jumping into the object
   this is when React updates the ref!
2. Commonly used within a side effect handler (useEffect!) where we interact
   with dom nodes
3. Not cleaning up means garage collection cannot happen which could cause
   memory leak (not rendered on the page anymore but still has event handlers
   attached etc)
4. Does not cause rerender
