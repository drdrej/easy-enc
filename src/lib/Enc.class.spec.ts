import {describe} from "node:test";
import {it}                           from "@jest/globals";
import {DEFAULT_ENC_SHA256_CBC_PCKS7} from "./Enc.class";

describe('Enc.class', () => {
    it('encode/decode - valid', () => {
        const x = DEFAULT_ENC_SHA256_CBC_PCKS7.encrypt('das ist ein test', '1234')
        const result = DEFAULT_ENC_SHA256_CBC_PCKS7.decrypt(x, '1234')
        expect(result).toEqual('das ist ein test')
    })
})
