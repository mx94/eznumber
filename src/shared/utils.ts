import { EnumPositiveOrNegative } from '../types/core'

export function getPN(num: string) {
  return num.charAt(0) === '-' ? ((num = num.slice(1)), EnumPositiveOrNegative.N) : EnumPositiveOrNegative.P
}
