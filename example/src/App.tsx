import {
  useZeeHConnect,
  ZeeHEvents,
  ZeeHResponseType,
  ZeeHButton,
} from '../../src/'

const ZeeHConnectUsingHooks = () => {
  const config = {
    publicKey: 'your public key here',
    onEvent: (event: ZeeHEvents, data: ZeeHResponseType) => {
      if (event === ZeeHEvents.WIDGET_OPENED) {
        console.log('widget is opened')
        console.log(data)
      }
      //check for other events here and do your stuff
    },
    userReference:
      'your client userId here or any unique idenfier for your client',
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
