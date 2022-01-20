// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import React from 'react'
import {useLocalStorageState} from '../utils.js'

function Board(props) {
  function renderSquare(i) {
    return (
      <button className="square" onClick={() => props.onClick(i)}>
        {props.squares[i]}
      </button>
    )
  }

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  )
}

const formatMove = ({move, totalMoves, current}) => {
  if (move === 0) {
    return `Start ${current === move ? '(current)' : ''}`
  }
  if (move === totalMoves - 1) {
    return `Last move  ${current === move ? '(current)' : ''}`
  }

  return `Move #${move} ${current === move ? '(current)' : ''}`
}

function Moves({moves, setCurrentMove, currentMove}) {
  return (
    <>
      {moves.map((array, index) => (
        <li key={`move-${index}`}>
          <button
            disabled={index === currentMove}
            onClick={() => setCurrentMove(index)}
          >
            {formatMove({
              move: index,
              totalMoves: moves.length,
              current: currentMove,
            })}
          </button>
        </li>
      ))}
    </>
  )
}

function Game() {
  const [history, setHistory] = useLocalStorageState('tic-tac-toe:history', [
    Array(9).fill(null),
  ])

  const [currentMove, setCurrentMove] = useLocalStorageState('tictac', 0)
  const currentSqaures = history[currentMove]
  const nextValue = calculateNextValue(currentSqaures)
  const winner = calculateWinner(currentSqaures)
  const status = calculateStatus(winner, currentSqaures, nextValue)

  function restart() {
    setCurrentMove(0)
    setHistory([Array(9).fill(null)])
  }

  function setCurrent(i) {
    setCurrentMove(i)
  }

  function selectSquare(square) {
    if (winner || currentSqaures[square]) {
      return
    }
    const squaresCopy = [...currentSqaures]
    squaresCopy[square] = nextValue
    const newHistory = [...history, squaresCopy]
    setHistory(newHistory)
    setCurrentMove(newHistory.length - 1)
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board onClick={selectSquare} squares={currentSqaures} />
        <button className="restart" onClick={restart}>
          restart
        </button>
      </div>
      <div className="game-info">
        <div className="status">{status}</div>
        <ol>
          <Moves
            moves={history}
            setCurrentMove={setCurrent}
            currentMove={currentMove}
          />
        </ol>
      </div>
    </div>
  )
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  const xSquaresCount = squares.filter(r => r === 'X').length
  const oSquaresCount = squares.filter(r => r === 'O').length
  return oSquaresCount === xSquaresCount ? 'X' : 'O'
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function App() {
  return <Game />
}

export default App
