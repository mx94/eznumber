import { EzNb, EzNumberParams } from '../types/core'
import { NUMERIC, INVALID } from '../shared/constants'
import { getPN } from '../shared/utils'

export function initFlag(context: EzNb, num: string) {
  let numLen: number
  let multiple: number
  let index: number

  // 非数字直接抛错
  if (!NUMERIC.test(num)) {
    throw Error(INVALID + 'number')
  }

  context.pn = getPN(num)

  if ((multiple = num.indexOf('.')) > -1) {
    num = num.replace('.', '')
  }

  if ((index = num.search(/e/i)) > 0) {
    if (multiple < 0) {
      multiple = index
    }
    multiple += +num.slice(index + 1)
    num = num.substring(0, index)
  } else if (multiple < 0) {
    // 整数
    multiple = num.length
  }

  numLen = num.length

  for (index = 0; index < numLen && num.charAt(index) == '0'; ) {
    ++index
  }

  if (index == numLen) {
    // 零
    context.curry = [(context.multiple = 0)]
  } else {
    for (; numLen > 0 && num.charAt(--numLen) == '0'; );
    context.multiple = multiple - index - 1
    context.curry = []

    // 去掉收尾零后，把每位数字放到数组中
    for (multiple = 0; index <= numLen; ) {
      context.curry[multiple++] = +num.charAt(index++)
    }
  }
}

export function parse(context: EzNb, directive: EzNumberParams) {
  if (!directive) {
    return
  }

  let num = directive

  if (typeof num === 'number') {
    initFlag(context, String(num))
    return
  }

  // 有额外操作
  if ((directive as string).includes('|')) {
    const dArr = (directive as string).split('|').map((item) => item.trim())
    num = dArr[0]

    initFlag(context, num)

    if (dArr.includes('>=')) {
    }
    return
  }
}
