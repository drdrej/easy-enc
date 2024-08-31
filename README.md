# Easy-Enc

Simple and easy to use library to encode/decode strings/objects. 
Primarly its syntax-suggar to encode/decode in just 1 line with predefined Encoders.
Library is based on crypto-js and written in TS.

## Features

- encode/decode SHA256
- base64 support
- lz compress

## How to install

In yarn based environment:
> yarn add easy-enc

in npm based environment:
> npm install easy-enc

To use inside your ts project just import the preset and use it to encode/decode.

```ts
import {SHA256_CBC_PCKS7} from 'easy-enc'

const encoded = SHA256_CBC_PCKS7.encode('msg', 'pwd')
const decoded = SHA256_CBC_PCKS7.decode(encoded, 'pwd')

console.log(decoded)
```
console output:
> 'msg'

 
## History

0.1.6 | Implement basic class. Added 1 default instance.

## License
License MIT
