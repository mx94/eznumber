import { EnumPositiveOrNegative } from '../types/core'

export function getPN(num: string) {
  return num.charAt(0) === '-'
    ? ((num = num.slice(1)), EnumPositiveOrNegative.N)
    : EnumPositiveOrNegative.P
}

export function formatNumberRgx(num: string) {
  var parts = num.split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return parts.join('.')
}
