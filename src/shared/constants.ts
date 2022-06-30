// 校验是否数字
export const NUMERIC = /^-?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i

// 校验是百分数
export const PERCENTAGE = /^[-\+]?\d+(\.\d+)?%$/

// 错误信息
export const NAME = '[eznumber.js] '
export const INVALID = NAME + 'Invalid '

// 出错后默认返回的字符
export const DEFAULT_SYMBOL = '-'
