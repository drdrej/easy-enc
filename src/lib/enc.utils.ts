import CryptoJS from "crypto-js/core";
import {EncOptions} from "./enc.types";

export function convertUtf8ToBase64( str: string ) {
    return btoa(encodeURIComponent( str ))
}
export function convertBase64ToUtf8( str: string ) {
    return decodeURIComponent(atob( str ))
}

export function createSalt(saltSize: number) {
    return CryptoJS.lib.WordArray.random(saltSize);
}

export function createEncProps(
    iv:CryptoJS.lib.WordArray,
    encOptions: EncOptions) {
    return {
            iv: iv,
            padding: encOptions.padding,
            mode: encOptions.mode,
            hasher: encOptions.hasher
        }

}
