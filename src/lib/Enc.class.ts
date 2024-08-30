import {EncOptions} from "./enc.types";
import CryptoJS     from "crypto-js/core";
import Pbkdf2 from 'crypto-js/pbkdf2'
import Aes from 'crypto-js/aes'
import {compressToBase64, decompressFromBase64} from 'lz-string'
import {createEncProps, createSalt}             from "./enc.utils";

export class Enc {
    public constructor(
        public encOptions: EncOptions
    ) {}

    public encrypt (msg: string, pass: string): string {
        const saltSize = this.encOptions.ivSize/8
        const salt = createSalt(saltSize)
        const key = Pbkdf2(pass, salt, {
            keySize: this.encOptions.keySize/32,
            iterations: this.encOptions.iterations
        });
        const iv = createSalt(saltSize);
        const encrypted = Aes.encrypt(compressToBase64(msg), key, createEncProps(iv, this.encOptions));
        return compressToBase64(salt.toString() + iv.toString() + encrypted.toString())
    }

    public decrypt (compressed: string, pass: string): string {
        const transitmessage = decompressFromBase64(compressed)
        const salt = CryptoJS.enc.Hex.parse(transitmessage.substring(0, 32));
        const iv = CryptoJS.enc.Hex.parse(transitmessage.substring(32, 64))
        const encrypted = transitmessage.substring(64);
        const key = Pbkdf2(pass, salt, {
            keySize: this.encOptions.keySize/32,
            iterations: this.encOptions.iterations
        });
        const decrypted = Aes.decrypt(encrypted, key, createEncProps(iv, this.encOptions))
        return decompressFromBase64(decrypted.toString(CryptoJS.enc.Utf8))
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
