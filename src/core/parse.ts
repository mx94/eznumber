import { EzNb, EzNumberParams } from '../types/core'
import { NUMERIC, PERCENTAGE } from '../shared/constants'
import { getPN } from '../shared/utils'

function initNumFlag(context: EzNb, num: string) {
  let numLen: number
  let multiple: number
  let index: number

  context.pn = getPN(num)

  if (context.pn === -1) {
    num = num.slice(1)
  }

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

  for (index = 0; index < numLen && num.charAt(index) === '0'; ) {
    ++index
  }

  if (index == numLen) {
    // 零
    context.curry = [(context.multiple = 0)]
  } else {
    for (; numLen > 0 && num.charAt(--numLen) === '0'; );
    context.multiple = multiple - index - 1
    context.curry = []

    // 去掉首尾零后，把每位数字放到数组中
    for (multiple = 0; index <= numLen; ) {
      context.curry[multiple++] = +num.charAt(index++)
    }
  }
}

function initFormatFlag(context: EzNb, formatStr: string) {
  const formatList = formatStr.split(' ')

  // 解析保留小数和 向上、向下、四舍五入模式
  const modeList = ['>=', '<=', '=']
  while (modeList.length) {
    const modeSymbol = modeList.shift()
    const index = formatList.findIndex((item) => item.includes(modeSymbol))
    if (index > -1) {
      const decimals = formatList[index].replace(modeSymbol, '').trim()

      if (!NUMERIC.test(decimals)) {
        context.onError(Error('Invalid number.'))
        context.error = true
        return
      }
      context.decimals = Number(decimals)
      formatList.splice(index, 1)
      round(context, Number(decimals) + context.multiple + 1, modeSymbol)
    }
  }

  // 千分位分隔符
  if (formatList.includes(',')) {
    context.thousandSeparated = true
  }

  // 转百分数
  if (formatList.includes('+%')) {
    context.percent = '+%'
  }

  // 保留正号(+)
  if (formatList.includes('++')) {
    context.positive = true
  }

  // 前面的符号
  const prefixIdx = formatList.findIndex((item) => /^\^.+\^$/.test(item))
  if (prefixIdx > -1) {
    context.prefix = formatList[prefixIdx].slice(1, -1)
  }

  // 后面的符号
  const suffixIdx = formatList.findIndex((item) => /^\$.+\$$/.test(item))
  if (suffixIdx > -1) {
    context.suffix = formatList[suffixIdx].slice(1, -1)
  }
}

function round(context: EzNb, effective: number, mode: string) {
  const curry = context.curry
  if (effective < curry.length) {
    const more = mode === '>=' || (mode === '=' && curry[effective] >= 5)

    curry.length = effective--

    if (more) {
      for (; ++curry[effective] > 9; ) {
        curry[effective] = 0
        if (!effective--) {
          ++context.multiple
          curry.unshift(1)
        }
      }
    }
  }
}

export function parse(context: EzNb, directive: EzNumberParams) {
  if (!directive) {
    context.onError(Error('Params is empty.'))
    context.error = true
    return
  }

  const str = String(directive)

  // 数字
  if (NUMERIC.test(str)) {
    initNumFlag(context, str)
    return
  }

  // 百分数
  if (PERCENTAGE.test(str)) {
    initNumFlag(context, String(Number(str.slice(0, -1)) / 100))
    return
  }

  // 有额外操作指令
  if (str.includes('|')) {
    if (str.split('|').length !== 2) {
      context.onError(Error('Invalid format.'))
      context.error = true
      return
    }
    let [leftSideStr, formatStr] = str.split('|').map((item) => item.trim())

    if (NUMERIC.test(leftSideStr)) {
      initNumFlag(context, leftSideStr)
    } else if (PERCENTAGE.test(str)) {
      initNumFlag(context, String(Number(str.slice(0, -1)) / 100))
    } else {
      // todo: 计算 + - * /
    }

    initFormatFlag(context, formatStr)
  }
}
