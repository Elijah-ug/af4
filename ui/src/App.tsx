import { useState } from 'react'
import './App.css'
import {BotpressChat} from "./components/BotpressChat.tsx"

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="">
      <h2>Hello from chat bot</h2>
      <div className="">
        <BotpressChat/>
      </div>
    </div>
  )
}

export default App
