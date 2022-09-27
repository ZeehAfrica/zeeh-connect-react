import { IFrameMessage, ZeeHConnectProps, ZeeHEvents } from './types'

var eventvar: any
var closeDivStyle: string =
  'position: fixed; width: 100%; height:100%; align: center; display:flex; justify:center; color: #FFF; font-size: 25px'

var containerStyle: string =
  'position:fixed;overflow: hidden;display:none;justify-content: center;align-items: center;z-index: 999999;height: 100%;overflow: auto;width: 100%;color: transparent;background: rgba(0, 0, 0, 0.6);visibility:hidden;margin: 0;top:0;right:0;bottom:0;left:0;'

var iframeStyle =
  'position: absolute;display: flex;border-radius: 5px;justify-content: center;align-content: center;overflow: auto;z-index: 99999999;width:400px;height: 90vh;min-height:500px;transition: opacity 0.3s ease 0s;visibility:hidden;margin: 0;'

var iframeMobilestyle =
  'position: absolute;display: flex;border-radius: 5px;justify-content: center;align-content: center;overflow: auto;z-index: 99999999;width:100%;height: 100%;min-height:500px;transition: opacity 0.3s ease 0s;visibility:hidden;margin: 0;'

var loaderStyles: string = `.app-loader {
  text-align: center;
  color: white;
  width: 100%;
  position: fixed;
}
@-webkit-keyframes app-loader__spinner {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
.app-loader__spinner {
  position: relative;
  display: inline-block;
  width: fit-content;
}
.app-loader__spinner div {
  position: absolute;
  -webkit-animation: app-loader__spinner linear 1s infinite;
  animation: app-loader__spinner linear 1s infinite;
  background: white;
  width: 10px;
  height: 30px;
  border-radius: 40%;
  -webkit-transform-origin: 5px 65px;
  transform-origin: 5px 65px;
}
.app-loader__spinner div:nth-child(1) {
  -webkit-transform: rotate(0deg);
  transform: rotate(0deg);
  -webkit-animation-delay: -0.916666666666667s;
  animation-delay: -0.916666666666667s;
}
.app-loader__spinner div:nth-child(2) {
  -webkit-transform: rotate(30deg);
  transform: rotate(30deg);
  -webkit-animation-delay: -0.833333333333333s;
  animation-delay: -0.833333333333333s;
}
.app-loader__spinner div:nth-child(3) {
  -webkit-transform: rotate(60deg);
  transform: rotate(60deg);
  -webkit-animation-delay: -0.75s;
  animation-delay: -0.75s;
}
.app-loader__spinner div:nth-child(4) {
  -webkit-transform: rotate(90deg);
  transform: rotate(90deg);
  -webkit-animation-delay: -0.666666666666667s;
  animation-delay: -0.666666666666667s;
}
.app-loader__spinner div:nth-child(5) {
  -webkit-transform: rotate(120deg);
  transform: rotate(120deg);
  -webkit-animation-delay: -0.583333333333333s;
  animation-delay: -0.583333333333333s;
}
.app-loader__spinner div:nth-child(6) {
  -webkit-transform: rotate(150deg);
  transform: rotate(150deg);
  -webkit-animation-delay: -0.5s;
  animation-delay: -0.5s;
}
.app-loader__spinner div:nth-child(7) {
  -webkit-transform: rotate(180deg);
  transform: rotate(180deg);
  -webkit-animation-delay: -0.416666666666667s;
  animation-delay: -0.416666666666667s;
}
.app-loader__spinner div:nth-child(8) {
  -webkit-transform: rotate(210deg);
  transform: rotate(210deg);
  -webkit-animation-delay: -0.333333333333333s;
  animation-delay: -0.333333333333333s;
}
.app-loader__spinner div:nth-child(9) {
  -webkit-transform: rotate(240deg);
  transform: rotate(240deg);
  -webkit-animation-delay: -0.25s;
  animation-delay: -0.25s;
}
.app-loader__spinner div:nth-child(10) {
  -webkit-transform: rotate(270deg);
  transform: rotate(270deg);
  -webkit-animation-delay: -0.166666666666667s;
  animation-delay: -0.166666666666667s;
}
.app-loader__spinner div:nth-child(11) {
  -webkit-transform: rotate(300deg);
  transform: rotate(300deg);
  -webkit-animation-delay: -0.083333333333333s;
  animation-delay: -0.083333333333333s;
}
.app-loader__spinner div:nth-child(12) {
  -webkit-transform: rotate(330deg);
  transform: rotate(330deg);
  -webkit-animation-delay: 0s;
  animation-delay: 0s;
}
.app-loader__spinner {
  -webkit-transform: translate(-20px, -20px) scale(0.2) translate(20px, 20px);
  transform: translate(-20px, -20px) scale(0.2) translate(20px, 20px);
}
`

function createLoader() {
  let loaderDiv = document.createElement('div')
  let childDiv = document.createElement('div')
  loaderDiv.setAttribute('id', 'zeeh-connect-app-loader')
  loaderDiv.classList.add('app-loader')
  childDiv.classList.add('app-loader__spinner')
  for (let i = 0; i < 12; i++) {
    let div = document.createElement('div')
    childDiv.appendChild(div)
  }
  loaderDiv.appendChild(childDiv)
  return loaderDiv
}

function addStyle() {
  let styleSheet = document.createElement('style')
  styleSheet.setAttribute('type', 'text/css')
  styleSheet.textContent = loaderStyles
  document.head.appendChild(styleSheet)
}

function turnOnVisibility() {
  var container: HTMLDivElement = document.getElementById(
    'zeeh-connect--widget-div'
  ) as HTMLDivElement
  container.style.display = 'flex'
  container.style.visibility = 'visible'
}

function turnOffVisibility() {
  if (document.getElementById('zeeh-connect--widget-div')) {
    document.getElementById('zeeh-connect--widget-div')!.remove()
  }
  window.removeEventListener('message', eventvar, false)
}

function getEvent(onEvent: any) {
  eventvar = window.addEventListener('message', function (event) {
    if (event.origin !== 'https://widget.zeeh.africa') return
    var data: IFrameMessage = JSON.parse(event.data)
    switch (data.event) {
      case ZeeHEvents.ACCOUNT_LINKED:
        onEvent(ZeeHEvents.ACCOUNT_LINKED, data.data)
        break
      case ZeeHEvents.WIDGET_CLOSED:
        onEvent(ZeeHEvents.WIDGET_CLOSED, data.data)
        turnOffVisibility()
        break
      case ZeeHEvents.WIDGET_OPENED:
        onEvent(ZeeHEvents.WIDGET_OPENED, data.data)
        break
      case ZeeHEvents.ACCOUNT_LINKED_SUCCESS:
        onEvent(ZeeHEvents.ACCOUNT_LINKED_SUCCESS, data.data)
        break
      case ZeeHEvents.INSTITUTION_SELECTED:
        onEvent(ZeeHEvents.INSTITUTION_SELECTED, data.data)
        break
      case ZeeHEvents.WIDGET_LOAD_ERROR:
        onEvent(ZeeHEvents.WIDGET_LOAD_ERROR, data.data)
        turnOffVisibility()
        break
    }
  })
}

var ZeeHInit = (config: ZeeHConnectProps) => {
  getEvent(config.onEvent)
  addStyle()
  if (!document.getElementById('zeeh-connect--widget-div')) {
    var container: HTMLDivElement = document.createElement('div')
    container.setAttribute('id', 'zeeh-connect--widget-div')
    container.setAttribute('style', containerStyle)
    var closeDiv = document.createElement('div')
    closeDiv.setAttribute('style', closeDivStyle)
    closeDiv.setAttribute('id', 'closediv')
    var loader = createLoader()
    container.appendChild(loader)
    document.body.appendChild(container)
  }

  var iframe: HTMLIFrameElement = document.createElement(
    'IFRAME'
  ) as HTMLIFrameElement
  var source = new URL(`https://widget.zeeh.africa/${config.publicKey}`)

  if (config.userReference) {
    source.searchParams.set('userReference', config.userReference)
  }
  iframe.src = source.href
  if (window.innerWidth < 600) {
    iframe.setAttribute('style', iframeMobilestyle)
  } else iframe.setAttribute('style', iframeStyle)

  iframe.setAttribute('id', 'zeeh-connect--frame-id')
  iframe.setAttribute('allowfullscreen', 'true')
  iframe.setAttribute('frameborder', '0')
  iframe.setAttribute('title', 'Zeeh Connect')
  iframe.setAttribute(
    'sandbox',
    'allow-same-origin allow-forms allow-scripts  allow-top-navigation-by-user-activation allow-popups'
  )
  let containe: HTMLDivElement = document.getElementById(
    'zeeh-connect--widget-div'
  ) as HTMLDivElement
  containe.appendChild(iframe)

  turnOnVisibility()

  iframe.onload = () => {
    var loader: HTMLDivElement = document.getElementById(
      'zeeh-connect-app-loader'
    ) as HTMLDivElement
    if (iframe.style.visibility === 'visible') {
      loader.style.display = 'none'
    } else {
      iframe.style.visibility = 'visible'
    }
  }
  iframe.focus({ preventScroll: false })
  containe.focus({ preventScroll: false })
  iframe.onerror = () => {
    var frame: HTMLIFrameElement = document.getElementById(
      'zeeh-connect--frame-id'
    ) as HTMLIFrameElement
    frame.style.visibility = 'hidden'
  }
}

export default ZeeHInit
