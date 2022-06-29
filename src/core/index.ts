import { EnumPositiveOrNegative } from '../types/core'
import { parse } from './parse'
import { stringify } from './stringify'

class Core {
  constructor(directive: string) {
    parse(this, directive)
    return this
  }

  pn = EnumPositiveOrNegative.P

  multiple = 0

  curry: any = []

  valueOf() {
    return stringify(this, false, !!this.curry[0])
  }

  toFixed(decimals?: number) {
    if (decimals !== undefined) {
      for (decimals = decimals + this.multiple + 1; this.curry.length < decimals; ) {
        this.curry.push(0)
      }
    }
    return stringify(this, false, !!this.curry[0])
  }
}

export default Core
