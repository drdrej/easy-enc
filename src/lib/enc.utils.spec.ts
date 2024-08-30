import {describe}                                 from "node:test";
import {expect, it}                               from "@jest/globals";
import {convertBase64ToUtf8, convertUtf8ToBase64} from "./enc.utils";

describe('enc.utils', () => {
    it('base64 - valid', () => {
        const enc = convertUtf8ToBase64('abcd')
        expect(enc).toBeDefined()
        expect(enc).not.toEqual('abcd')
        const result = convertBase64ToUtf8(enc)
        expect(result).toEqual('abcd')
    })
})
