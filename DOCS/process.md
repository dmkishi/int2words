Process Documentation
================================================================================

Coercing Input
--------------------------------------------------------------------------------
### Coercing Behaviors
String    | `parseFloat()`   | `parseInt()`   | `Number()`
----------|------------------|----------------|-----------
`"1e2"`   | `100`            | `1`            | `100`
`"1e-1"`  | `0.1`            | `1`            | `0.1`
`"0b10"`  | `0`              | `0`            | `2`
`"0o10"`  | `0`              | `0`            | `8`
`"0x10"`  | `0`              | `16`           | `16`
`"1n"`    | `1`              | `1`            | `NaN`
`"1_000"` | `1`              | `1`            | `NaN`
`""`      | `NaN`            | `NaN`          | `0`

### Coercing a String to a Number
Type        | String    | Decimal | Ideal   | Note
------------|-----------|---------|---------|-------------------------------
Decimal     | `"1,000"` | `1,000` | `Error` | Cannot support all delimiters.
Exponent    | `"1e2"`   | `100`   | `100`   |
Exponent    | `"1e-1"`  | `0.1`   | `0.1`   |
Binary      | `"0b10"`  | `2`     | `2`     |
Octal       | `"0o10"`  | `8`     | `8`     |
Hexadecimal | `"0x10"`  | `16`    | `16`    |
BigInt      | `"1n"`    | `1`     | `NaN`   | BigInt is not a `number`.
Empty       | `""`      | –       | `NaN`   |

### Coercing a Number to an Integer
Number      | Ideal   | Note
------------|---------|---------------------------------------
`0`         | `0`     |
`1`         | `1`     |
`1.0`       | `1`     | `1.0` and `1` are equivalent.
`1.1`       | `Error` | `1.1` has no equivalent integer value.
`Infinity`  | `Error` |
`-Infinity` | `Error` |
`NaN`       | `Error` |
