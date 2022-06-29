import Core from './core'

function EzNumber(directive: string) {
  return new Core(directive).valueOf()
}

Object.setPrototypeOf(EzNumber, Core)

export default EzNumber
