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
}
