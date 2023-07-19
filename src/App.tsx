import { useCallback, useEffect, useState } from 'react'

import './App.css'
import words from "./word.json"
import HangManDrawing from './HangManDrawing'
import HangManWord from './HangManWord'
import Keyboard from './Keyboard'

function getWord() {
  return words[Math.floor(Math.random()* words.length) ]
  
}

function App() {
  const [wordGuess, setGuessWord] = useState(getWord)

  console.log(wordGuess);
  const [guessLetters, setGuessLetters] = useState<string[]>([])
  
  
  
  const incorrectLetters = guessLetters.filter(letter => !wordGuess.includes(letter))

  const isLoser = incorrectLetters.length >= 6
  const isWinner = wordGuess.split("").every(letter=>guessLetters.includes(letter))

  const addGuessLetter = useCallback((letter: string) =>{
    if (guessLetters.includes(letter) || isLoser || isWinner) return
    setGuessLetters(currentletters=> [...currentletters,letter])
  },
    [guessLetters,isLoser,isWinner]
  )
  
  useEffect(() => {
    const handler = (e: KeyboardEvent)=>{
      const key = e.key

      if (!key.match(/^[a-z]$/)) return 
      
      e.preventDefault()
      addGuessLetter(key)
    }
    document.addEventListener("keypress", handler)
    
    return () => {
      document.removeEventListener("keypress",handler)
    }
  }, [guessLetters])
  
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key
      if (key !== "Enter") return

      e.preventDefault()
      setGuessLetters([])
      setGuessWord(getWord())
    }

    document.addEventListener("keypress", handler)

    return () => {
      document.removeEventListener("keypress", handler)
    }
  }, [])
  return (
    <div style={{
      maxWidth: "800px",
      display: "flex",
      flexDirection: "column",
      gap: "2rem",
      margin: "0 auto",
      alignItems: "center",
      
      
    }}>
      <div style={{
        fontSize: "2rem",
        textAlign: "center",
        
      }}>
        {
          isWinner && "Winner! -Refresh to try again"
        }
        {
          isLoser && "Nice Try - Refresh to try again"
        }
      </div>
      <HangManDrawing numberOfGuess={ incorrectLetters.length} />
      <HangManWord
        reveal={isLoser}
        guessLetters={guessLetters}
        wordGuess={wordGuess} />
      <div style={{alignSelf:"stretch"}}>
        <Keyboard
          disables={isWinner || isLoser}
          activeLetters={guessLetters.filter(letter=> wordGuess.includes(letter))}
          inactiveLetters={incorrectLetters}
          addGuessLetters={addGuessLetter}
          
        />

      </div>
    </div>
  )
}

export default App

