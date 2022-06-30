# EzNumber

**An intelligence number adapter**

## Use

```javascript
import EzNumber from 'eznumber'
```

### Basic

```javascript
EzNumber('123.98900').run() // '123.989'
EzNumber('-0.000000000008').run() // '-0.000000000008'
EzNumber('8e-8').run() // '0.00000008'
```

### Float

Rounding mode:

- `>=` Up
- `<=` Down
- `=` To nearest neighbour

```javascript
EzNumber('123.98900 | >=8').run() // '123.98900000'
EzNumber('123.98900 | >=2').run() // '123.99'
EzNumber('123.98900 | =2').run() // '123.99'
EzNumber('123.98900 | <=2').run() // '123.98'
```

### Percentage

```javascript
EzNumber('0.028 | %').run() // '2.8%'
EzNumber('-0.028%').run() // '0.028'
```

### Prefix

```javascipt
EzNumber('0.000001 | ^≈ ^ >=8').run() // '≈ 0.00000100'
```

### Suffix

```javascript
EzNumber('0.000001 | $ USD$ >=8').run() // '0.00000100 USD'
```

New features are on the way...

## Licence

[MIT](LICENCE.md)
