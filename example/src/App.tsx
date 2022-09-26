import { useState } from 'react'
import { ZeeHButton } from 'zeeh-connect-react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <p>Zeeh Connect React</p>
      <ZeeHButton
        publicKey="Ayo"
        onEvent={(event) => {
          console.log(event)
        }}
      >
        Click me
      </ZeeHButton>
    </div>
  )
}

export default App
