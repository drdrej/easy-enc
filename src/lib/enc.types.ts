import CryptoJS from "crypto-js/core";

export type EncOptions = {
    keySize: number
    ivSize: number
    iterations: number

    padding: any
    mode: any
    hasher: any
}


