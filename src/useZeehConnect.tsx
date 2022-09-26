import { ZeeHConnectProps } from './types'
import ZeeHInit from './zeehCore'

const useZeehConnect = (props: ZeeHConnectProps) => {
  const { onEvent, publicKey, ...rest } = props

  if (!publicKey || !onEvent) {
    throw new Error('Please provide a publicKey and onEvent callback')
  }

  if (typeof window === 'undefined') {
    throw new Error('ZeeHConnect only works in the browser')
  }

  return {
    zeehInit: () => ZeeHInit({ publicKey, onEvent, ...rest }),
  }
}

export default useZeehConnect
