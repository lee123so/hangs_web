/* eslint-disable */
import BigInteger from '@/auth/ jsbn';
import SecureRandom from '@/auth/rng';

const rsa = (() => {
    'use strict';

    function parseBigInt(str, r) {
        return new BigInteger(str, r);
    }

    function pkcs1pad2(s, n) {
        if (n < s.length + 11) { // TODO: fix for utf-8
            alert('Message too long for RSA')
            return null
        }
        var ba = new Array()
        var i = s.length - 1
        while (i >= 0 && n > 0) {
            var c = s.charCodeAt(i--)
            if (c < 128) { // encode using utf-8
                ba[--n] = c
            } else if ((c > 127) && (c < 2048)) {
                ba[--n] = (c & 63) | 128
                ba[--n] = (c >> 6) | 192
            } else {
                ba[--n] = (c & 63) | 128
                ba[--n] = ((c >> 6) & 63) | 128
                ba[--n] = (c >> 12) | 224
            }
        }
        ba[--n] = 0
        var rng = new SecureRandom()
        var x = new Array()
        while (n > 2) { // random non-zero pad
            x[0] = 0
            while (x[0] == 0) rng.nextBytes(x)
            ba[--n] = x[0]
        }
        ba[--n] = 2
        ba[--n] = 0
        return new BigInteger(ba)
    }

    function RSAKey() {
        this.n = null
        this.e = 0
        this.d = null
        this.p = null
        this.q = null
        this.dmp1 = null
        this.dmq1 = null
        this.coeff = null
    }

    function RSASetPublic(N, E) {
        if (N != null && E != null && N.length > 0 && E.length > 0) {
            this.n = parseBigInt(N, 16)
            this.e = parseInt(E, 16)
        } else { console.log('Invalid RSA public key') }
    }

    function RSADoPublic(x) {
        return x.constructor === BigInteger ? x.modPowInt(this.e, this.n) : ''
    }

    function RSAEncrypt(text) {
        var m = pkcs1pad2(text, (this.n.bitLength() + 7) >> 3)
        if (m == null) return null
        var c = this.doPublic(m)
        if (c == null) return null
        var h = c.toString(16)
        if ((h.length & 1) == 0) return h; else return '0' + h
    }

    RSAKey.prototype.doPublic = RSADoPublic;
    RSAKey.prototype.setPublic = RSASetPublic;
    RSAKey.prototype.encrypt = RSAEncrypt;

    return RSAKey;
})();

console.log('rsa', rsa);

export default rsa;

