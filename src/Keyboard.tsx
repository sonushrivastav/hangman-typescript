import styles from "./keyboard.module.css"


type keyboardprops = {
  disables? : boolean
  activeLetters: string[]
  inactiveLetters: string[]
  addGuessLetters: (letter: string) => void
}

const Keyboard = ({
  activeLetters,
  inactiveLetters,
  addGuessLetters,
  disables = false
}:keyboardprops) => {


    const KEYS = [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z",
      ]
      
  return (
      <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(75px,1fr))",
          gap:".5rem"
    }}>
          {
        KEYS?.map(key => {
          const isActive = activeLetters.includes(key)
          const isInactive = inactiveLetters.includes(key)
                return <button
                  key={key}
                  onClick={()=>addGuessLetters(key)}
                  className={`${styles.btn} ${isActive ? styles.active : ""} ${isInactive ? styles.inactive : ""}`}
                  disabled={isInactive || isActive || disables}
                >{key}</button>
              })
      }
    </div>
  )
}

export default Keyboard
