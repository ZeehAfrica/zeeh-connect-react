import * as React from 'react'
import { ZeeHConnectProps } from './types'
import useZeehConnect from './useZeehConnect'

interface ZeeHButtonProps
  extends ZeeHConnectProps,
    React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode
}

const ZeehButton = (props: ZeeHButtonProps) => {
  const { zeehInit } = useZeehConnect(props)
  return (
    <button onClick={() => zeehInit()} {...props}>
      {props.children}
    </button>
  )
}

export default ZeehButton
