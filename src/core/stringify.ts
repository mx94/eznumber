import { EzNb } from '../types/core'
import { DEFAULT_SYMBOL } from '../shared/constants'
import { formatNumberRgx } from '../shared/utils'

export function stringify(context: EzNb, doExponential: boolean) {
  if (context.error) {
    return DEFAULT_SYMBOL
  }
  // 保留小数
  if (context.decimals !== undefined) {
    let fixedCount = context.decimals
    for (fixedCount = fixedCount + context.multiple + 1; context.curry.length < fixedCount; ) {
      context.curry.push(0)
    }
  }
  let multiple = context.multiple
  let num = context.curry.join('')
  let numLen = num.length

  if (doExponential) {
    num =
      num.charAt(0) +
      (numLen > 1 ? '.' + num.slice(1) : '') +
      (multiple < 0 ? 'e' : 'e+') +
      multiple
  } else if (multiple < 0) {
    for (; ++multiple; ) {
      num = '0' + num
    }
    num = '0.' + num
  } else if (multiple > 0) {
    if (++multiple > numLen) {
      for (multiple -= numLen; multiple--; ) {
        num += '0'
      }
    } else if (multiple < numLen) {
      num = num.slice(0, multiple) + '.' + num.slice(multiple)
    }
  } else if (numLen > 1) {
    num = num.charAt(0) + '.' + num.slice(1)
  }

  if (context.percent === '+%') {
    // todo: 百分数转化
  } else if (context.thousandSeparated) {
    num = formatNumberRgx(num)
  }

  if (context.pn < 0 && !!context.curry[0]) {
    num = '-' + num
  }

  if (context.pn > 0 && context.positive) {
    num = '+' + num
  }

  return num
}
