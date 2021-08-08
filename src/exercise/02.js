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

// Extra credit 1 & 2
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
// const useLocalStorage = (key, defaultvalue = '') => {
//   const [state, setState] = React.useState(
//     () => window.localStorage.getItem(key) || defaultvalue,
//   )

//   React.useEffect(() => {
//     window.localStorage.setItem(key, state)
//   }, [key, state])

//   return [state, setState]
// }

// function Greeting({initialName = ''}) {
//   const [name, setName] = useLocalStorage('name', initialName)

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

// Exra credit 4
const useLocalStorage = (
  key,
  defaultvalue = '',
  {
    sterilise = value => JSON.stringify(value),
    desterilise = value => JSON.parse(value),
  },
) => {
  const [state, setState] = React.useState(() => {
    const valueInLocalStorage = window.localStorage.getItem(key)
    if (valueInLocalStorage) {
      return desterilise(valueInLocalStorage)
    }

    return typeof defaultvalue === 'function' ? defaultvalue() : defaultvalue
  })

  React.useEffect(() => {
    window.localStorage.setItem(key, sterilise(state))
  }, [key, sterilise, state])

  return [state, setState]
}

function Greeting({initialName = ''}) {
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
