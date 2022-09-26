export type ZeeHConnectProps = {
  publicKey: string
  userReference?: string
  onEvent: (event: ResponseType) => void
}

export type IFrameMessage = {
  event: string
  data: ResponseType
}

export type ResponseType = {
  message: string
  timeStamps: string
  bank?: string
  institution?: {
    _id: string
    institution: {
      name: string
      bankCode: string
      type?: string
    }
    name: string
    accountNumber: string
    balance: number
    userReference: string
    bvn: number
  }
}

export enum ZeeHEvents {
  WIDGET_OPENED = 'WIDGET_OPENED',
  WIDGET_CLOSED = 'WIDGET_CLOSED',
  ACCOUNT_LINKED = 'ACCOUNT_LINKED',
  ACCOUNT_LINKED_SUCCESS = 'ACCOUNT_LINKED_SUCCESS',
  INSTITUTION_SELECTED = 'INSTITUTION_SELECTED',
  WIDGET_LOAD_ERROR = 'WIDGET_LOAD_ERROR',
}
