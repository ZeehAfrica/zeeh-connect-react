import {
  useZeeHConnect,
  ZeeHEvents,
  ZeeHResponseType,
  ZeeHButton,
} from '../../src/'

const ZeeHConnectUsingHooks = () => {
  const config = {
    publicKey: 'Ay',
    onEvent: (event: ZeeHEvents, data: ZeeHResponseType) => {
      console.log(event)
      console.log(data)
    },
  }
  const { zeehInit } = useZeeHConnect(config)

  return <button onClick={() => zeehInit()}>Link your account(Hook)</button>
}

const ZeeHConnectUsingButton = () => {
  const config = {
    publicKey: 'Ayo',
    onEvent: (event: ZeeHEvents, data: ZeeHResponseType) => {
      console.log(event)
      console.log(data)
    },
  }
  return (
    <ZeeHButton style={{ backgroundColor: 'blue', color: 'white' }} {...config}>
      Link your account(Button)
    </ZeeHButton>
  )
}

function App() {
  return (
    <div>
      <ZeeHConnectUsingHooks />
      <ZeeHConnectUsingButton />
    </div>
  )
}

export default App
