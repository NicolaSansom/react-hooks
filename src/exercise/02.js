// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import React from 'react'
// Basic
// function Greeting({initialName = ''}) {
//   const [name, setName] = React.useState(initialName)

//   function handleChange(event) {
//     setName(event.target.value)
//   }
//   return (
//     <div>
//       <form>
//         <label htmlFor="name">Name: </label>
//         <input onChange={handleChange} id="name" />
//       </form>
//       {name ? <strong>Hello {name}</strong> : 'Please type your name'}
//     </div>
//   )
// }

// Extra credit 1
// function Greeting({initialName = ''}) {
//   const [name, setName] = React.useState(
//     () => window.localStorage.getItem('name') || initialName,
//   )

//   React.useEffect(() => {
//     window.localStorage.setItem('name', name)
//   }, [name])

//   function handleChange(event) {
//     setName(event.target.value)
//   }
//   return (
//     <div>
//       <form>
//         <label htmlFor="name">Name: </label>
//         <input onChange={handleChange} id="name" />
//       </form>
//       {name ? <strong>Hello {name}</strong> : 'Please type your name'}
//     </div>
//   )
// }

// Extra credit 3
function Greeting({initialName = ''}) {
  const useLocalStorage = (key, defaultvalue = '') => {
    const [state, setState] = React.useState(() =>
      window.localStorage.getItem(key),
    )

    React.useEffect(() => {
      window.localStorage.setItem(key, state)
    }, [key, state])

    return [state, setState]
  }

  const [name, setName] = useLocalStorage('name', initialName)

  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting initialName="Nick" />
}

export default App
