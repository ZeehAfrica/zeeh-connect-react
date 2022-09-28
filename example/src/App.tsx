import {
  useZeeHConnect,
  ZeeHEvents,
  ZeeHResponseType,
  ZeeHButton,
} from '../../src/'

const ZeeHConnectUsingHooks = () => {
  const config = {
    publicKey: 'pk_VH05d6NcDYUnL0yTT8j1tkBBX', //public key from connect app
    onEvent: (event: ZeeHEvents, data: ZeeHResponseType) => {
      if (event === ZeeHEvents.ACCOUNT_LINKED) {
        console.log('Account has already been linked')
        console.log(data)
      } else if (event === ZeeHEvents.WIDGET_OPENED) {
        console.log('widget is opened')
        console.log(data)
      } else if (event === ZeeHEvents.WIDGET_CLOSED) {
        console.log('widget is closed')
        console.log(data)
      } else if (event === ZeeHEvents.ACCOUNT_LINKED_SUCCESS) {
        console.log('Account lnked successfully ')
        console.log(data)
      } else if (event === ZeeHEvents.INSTITUTION_SELECTED) {
        console.log('Institution has been selected on widget')
        console.log(data)
      } else if (event === ZeeHEvents.WIDGET_LOAD_ERROR) {
        console.log('Widget faced an error loading up')
        console.log(data)
      }
    },
    userReference:
      'your client userId here or any unique idenfier for your client',
  }
  const { zeehInit } = useZeeHConnect(config)

  return <button onClick={() => zeehInit()}>Link your account(Hook)</button>
}

const ZeeHConnectUsingButton = () => {
  const config = {
    publicKey: 'pk_VH05d6NcDYUnL0yTT8j1tkBBX', //public key from connect app
    onEvent: (event: ZeeHEvents, data: ZeeHResponseType) => {
      if (event === ZeeHEvents.ACCOUNT_LINKED) {
        console.log('Account has already been linked')
        console.log(data)
      } else if (event === ZeeHEvents.WIDGET_OPENED) {
        console.log('widget is opened')
        console.log(data)
      } else if (event === ZeeHEvents.WIDGET_CLOSED) {
        console.log('widget is closed')
        console.log(data)
      } else if (event === ZeeHEvents.ACCOUNT_LINKED_SUCCESS) {
        console.log('Account lnked successfully ')
        console.log(data)
      } else if (event === ZeeHEvents.INSTITUTION_SELECTED) {
        console.log('Institution has been selected on widget')
        console.log(data)
      } else if (event === ZeeHEvents.WIDGET_LOAD_ERROR) {
        console.log('Widget faced an error loading up')
        console.log(data)
      }
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
