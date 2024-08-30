import {EncOptions} from "./enc.types";
import CryptoJS     from "crypto-js/core";
import Pbkdf2 from 'crypto-js/pbkdf2'
import Aes from 'crypto-js/aes'
import {compress, decompress} from 'lz-string'

export class Enc {
    public constructor(
        public encOptions: EncOptions
    ) {}

    public encrypt (msg: string, pass: string): string {
        const saltSize = this.encOptions.ivSize/8 // hex 32 in length
        const salt = CryptoJS.lib.WordArray.random(saltSize)
        const key = Pbkdf2(pass, salt, {
            keySize: this.encOptions.keySize/32,
            iterations: this.encOptions.iterations
        });
        const iv = CryptoJS.lib.WordArray.random(saltSize);
        const encrypted = Aes.encrypt(msg, key, {
            iv: iv,

        });
        return salt.toString() + iv.toString() + encrypted.toString()
    }

    public decrypt (transitmessage: string, pass: string): string {
        const salt = CryptoJS.enc.Hex.parse(transitmessage.substr(0, 32));
        const iv = CryptoJS.enc.Hex.parse(transitmessage.substr(32, 32))
        const encrypted = transitmessage.substring(64);
        const key = Pbkdf2(pass, salt, {
            keySize: this.encOptions.keySize/32,
            iterations: this.encOptions.iterations
        });
        const decrypted = Aes.decrypt(encrypted, key, {
            iv: iv,
            padding: this.encOptions.padding,
            mode: CryptoJS.mode.CBC,
            hasher: CryptoJS.algo.SHA256
        })
        return decrypted.toString(CryptoJS.enc.Utf8)
    }
}

export const DEFAULT_ENC_SHA256_CBC_PCKS7 = new Enc({
    keySize: 256,
    ivSize: 128,
    iterations: 100,
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC,
    hasher: CryptoJS.algo.SHA256
})
