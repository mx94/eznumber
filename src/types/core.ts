export type EzNumberParams = string | number
export enum EnumPositiveOrNegative {
  P = 1,
  N = -1,
}

export type EzNb = {
  // 正: 1 负: -1
  pn: EnumPositiveOrNegative
  // 乘或者除以 1 + 几个零的数能把当前数整数位变成个位数
  multiple: number
  // 字符串去掉首尾的零后拼成数组
  curry: number[]
  // 若有错误直接解析并返回'-'
  error?: boolean
  // 结果保留几位小数
  decimals?: number
  // 是否保留正号
  positive?: boolean
  // 前缀符号
  prefix?: string
  // 后缀符号
  suffix?: string
  // 转百分数
  percent?: string
  // 千分位
  thousandSeparated?: boolean
  onError: (err: Error) => {}
}

export type RoundParams = {
  context: EzNb
  // 有效位数
  effective: number
  // >= <= =
  mode: string
}
