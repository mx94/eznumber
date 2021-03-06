import Core from './core'
import { EzNumberParams } from './types/core'

function EzNumber(directive: EzNumberParams) {
  return new Core(directive)
}

Object.setPrototypeOf(EzNumber, Core)

export default EzNumber
