import { EnumPositiveOrNegative, EzNumberParams } from '../types/core'
import { parse } from './parse'
import { stringify } from './stringify'
class Core {
  constructor(directive: EzNumberParams) {
    parse(this, directive)
    return this
  }

  pn = EnumPositiveOrNegative.P

  multiple = 0

  curry: any = []

  run(options: Record<string, any>) {
    return stringify(this, false)
  }

  onError(err: Error) {
    console.error(err)
    return err
  }
}

export default Core
