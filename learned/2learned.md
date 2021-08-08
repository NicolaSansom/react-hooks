# useEffect: persistent state

`React.useEffect` is a built-in hook that allows you to run some custom code
after React renders (and re-renders) your component to the DOM. It accepts a
callback function which React will call after the DOM has been updated:

Function syntax means function is only called on inital state e.g. Only needed
when there could be a bottleneck as the function is expensive to run.

```js
const [state, setState] = React.useState(
  () => window.localStorage.getItem(key) || defaultvalue,
)
```

Custom hoock return array. useEffect can be deployed to manage side effects. All
a custom hook is a is function that uses other hooks inside of it. The `use`
naming is useful for hooks eslint plugin.

Extra credit 4 only run deserialize if there is something already in local
storage.
