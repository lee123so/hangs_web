import CryptoJS from "crypto-js";
import encHex from "crypto-js/enc-hex";
import aes from "crypto-js/aes";
// import padZeroPadding from "crypto-js/pad-zeropadding";
import Cookies from "js-cookie";
import sha256 from "js-sha256";

export default class Statics {
    static encrypt(value) {
        const key = encHex.parse(import.meta.env.VITE_CRYPTO_KEY);
        const iv = encHex.parse(import.meta.env.VITE_CRYPTO_IV);
        let encrypted = CryptoJS.AES.encrypt(value, key, {iv}).toString();
        console.log(encrypted)
        return encrypted;
    }
    static decrypt(value) {
        const key = encHex.parse(import.meta.env.VITE_CRYPTO_KEY);
        const iv = encHex.parse(import.meta.env.VITE_CRYPTO_IV);

        let decrypted = CryptoJS.AES.decrypt(value, key, { iv }).toString(
            CryptoJS.enc.Utf8
        );
        return decrypted;
    }
    static async sha256DataMatch(value) {
        const encoder = new TextEncoder();
        const data = encoder.encode(value.toString());
        const hash = sha256.create();
        hash.update(data);
        const hashedPassword = hash.hex();
        return hashedPassword;
    }
    static saveSetCookie(key, value) {
        const encrypt_key = Statics.encrypt(key);
        const encrypt_value = Statics.encrypt(value);
        Cookies.set(encrypt_key, encrypt_value, { expires: 1 });
    }
    static removeCookie(key) {
        const encrypt_key = Statics.encrypt(key);
        Cookies.remove(encrypt_key);
    }
    //암호화 된 쿠키의 값을 취득
    static loadGetCookie(key) {
        const encrypt_key = Statics.encrypt(key);
        return Cookies.get(encrypt_key);
    }

    //쿠키의 값을 복호화하여 취득
    static getValueOfCookie(key) {
        try {
            const encrypt_key = Statics.encrypt(key);
            const cookies_value = Cookies.get(encrypt_key);
            const decrypt_value = Statics.decrypt(cookies_value);
            return decrypt_value;
        } catch (e) {
            return null;
        }
    }

}
