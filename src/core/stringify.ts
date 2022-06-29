import { EzNb } from '../types/core'

export function stringify(context: EzNb, doExponential: boolean, isNonzero: boolean) {
  let multiple = context.multiple
  let numWithoutPadZero = context.curry.join('')
  let n = numWithoutPadZero.length

  if (doExponential) {
    numWithoutPadZero =
      numWithoutPadZero.charAt(0) +
      (n > 1 ? '.' + numWithoutPadZero.slice(1) : '') +
      (multiple < 0 ? 'e' : 'e+') +
      multiple
  } else if (multiple < 0) {
    for (; ++multiple; ) {
      numWithoutPadZero = '0' + numWithoutPadZero
    }
    numWithoutPadZero = '0.' + numWithoutPadZero
  } else if (multiple > 0) {
    if (++multiple > n) {
      for (multiple -= n; multiple--; ) {
        numWithoutPadZero += '0'
      }
    } else if (multiple < n) {
      numWithoutPadZero = numWithoutPadZero.slice(0, multiple) + '.' + numWithoutPadZero.slice(multiple)
    }
  } else if (n > 1) {
    numWithoutPadZero = numWithoutPadZero.charAt(0) + '.' + numWithoutPadZero.slice(1)
  }

  return context.pn < 0 && isNonzero ? '-' + numWithoutPadZero : numWithoutPadZero
}
