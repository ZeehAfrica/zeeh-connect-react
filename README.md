# zeeh-connect-react

React SDK for implementing ZeeH widget - It is a quick and secure way to link bank accounts to ZeeH from within your React app. ZeeH Connect is a drop-in framework that handles connecting a financial institution to your app (credential validation, bank statements etc).

## Documentation

For complete information about ZeeH Connect, head to the [docs](https://zeehdocs.zeeh.africa).

## Getting Started

Checkout our [get started guide](https://zeehdocs.zeeh.africa/guides/getting-started) to create your developer account and retrieve your Client Token, API Keys, and Private Keys.

## Installation

using npm

```sh
npm install zeeh-connect-react
```

using yarn

```sh
yarn add zeeh-connect-react
```

## Usage

### with hook

```js
import {
  useZeeHConnect,
  ZeeHEvents,
  ZeeHResponseType,
} from 'zeeh-connect-react'

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

function App() {
  return (
    <div>
      <ZeeHConnectUsingHooks />
    </div>
  )
}

export default App
```

### with component

```js
import { ZeeHEvents, ZeeHResponseType, ZeeHButton } from 'zeeh-connect-react'

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
      <ZeeHConnectUsingButton />
    </div>
  )
}

export default App
```

## Configuration Options

- [`publicKey`](#publicKey)
- [`onEvent`](#onEvent)
- [`userReference`](#userReference)

### <a id="publicKey"></a> `publicKey`

#### String: Required

This is your ZeeH Africa public API key from [ZeeH dashboard](https://dash.zeeh.africa/app).

### <a name="onEvent"></a> `onEvent`

#### (data) => { Void }: Required

A set of well defined events help to communicate efficiently with the widget to monitor different stages of the linking. [`userReference`](#userReference) passed.

```js
const config = {
  publicKey: 'YOUR_ZeeH Africa_PUBLIC_KEY_HERE',
  onEvent: (event: ZeeHEvents, data: ZeeHResponseType) => {
    console.log(data)
    console.log(event)
  },
}
```

### <a name="connectEvent"></a> Zeeh Events

#### <a name="eventName"></a> `eventName: String`

Event names corespond to the type of event that occurred. Possible options are in the table below.

| Event Name             | Description                                               |
| ---------------------- | --------------------------------------------------------- |
| ACCOUNT_LINKED         | Triggered If the User has already been linked             |
| WIDGET_OPENED          | Triggered when the user opened the Connect Widget.        |
| ACCOUNT_LINKED_SUCCESS | Triggered when the user successfully links their account. |
| INSTITUTION_SELECTED   | Triggered when the user selects an institution.           |
| WIDGET_CLOSED          | Triggered when the user closes the widget.                |
| WIDGET_LOAD_ERROR      | Triggered when the widget encounters an error             |

The data JSON returned from the ACCOUNT_LINKED_SUCCESS event.

```js
{
  message:"linking successful",
  timeStamps:"",
  institution:{
    _id: 'uuid string',
    institution: {
      name: 'FCMB'
      bankCode:'214'
      type: 'classic savings',
    },
    name: 'jon doe'
    accountNumber: '1010101010'
    balance: 5000
    userReference: 'random string'
    bvn: 2222
  }
}
```

### <a id="userReference"></a> `userReference`

#### String: Optional

A unique string that should be passed to the connect widget. This will act like an Id of your user that is with Us. you can get account details passing userReference as a params.
It will be generated automatically if not passed, but it's recommended to always pass it. It could be your client Id.

## Examples

See more examples [here](/example/src/App.tsx).

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

[Apache](/LICENSE)
