/*
* A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
* Digest Algorithm, as defined in RFC 1321.
* Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
* Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
* Distributed under the BSD License
* See http://pajhome.org.uk/crypt/md5 for more info.
*/
var __define = this.__define || function (o, p, g, s) {   Object.defineProperty(o, p, { configurable:true, enumerable:true, get:g,set:s }) };
/*
 * Configurable variables. You may need to tweak these to be compatible with
 * the server-side, but the defaults work in most cases.
 */
var md5 = (function () {
    function md5() {
        this.hexcase = 0; /* hex output format. 0 - lowercase; 1 - uppercase        */
        this.b64pad = ""; /* base-64 pad character. "=" for strict RFC compliance   */
    }
    var d = __define,c=md5;p=c.prototype;
    /*
     * These are the privates you'll usually want to call
     * They take string arguments and return either hex or base-64 encoded strings
     */
    p.hex_md5 = function (s) {
        return this.rstr2hex(this.rstr_md5(this.str2rstr_utf8(s)));
    };
    p.b64_md5 = function (s) {
        return this.rstr2b64(this.rstr_md5(this.str2rstr_utf8(s)));
    };
    p.any_md5 = function (s, e) {
        return this.rstr2any(this.rstr_md5(this.str2rstr_utf8(s)), e);
    };
    p.hex_hmac_md5 = function (k, d) {
        return this.rstr2hex(this.rstr_hmac_md5(this.str2rstr_utf8(k), this.str2rstr_utf8(d)));
    };
    p.b64_hmac_md5 = function (k, d) {
        return this.rstr2b64(this.rstr_hmac_md5(this.str2rstr_utf8(k), this.str2rstr_utf8(d)));
    };
    p.any_hmac_md5 = function (k, d, e) {
        return this.rstr2any(this.rstr_hmac_md5(this.str2rstr_utf8(k), this.str2rstr_utf8(d)), e);
    };
    /*
     * Perform a simple self-test to see if the VM is working
     */
    p.md5_vm_test = function () {
        return this.hex_md5("abc").toLowerCase() == "900150983cd24fb0d6963f7d28e17f72";
    };
    /*
     * Calculate the MD5 of a raw string
     */
    p.rstr_md5 = function (s) {
        return this.binl2rstr(this.binl_md5(this.rstr2binl(s), s.length * 8));
    };
    /*
     * Calculate the HMAC-MD5, of a key and some data (raw strings)
     */
    p.rstr_hmac_md5 = function (key, data) {
        var bkey = this.rstr2binl(key);
        if (bkey.length > 16)
            bkey = this.binl_md5(bkey, key.length * 8);
        var ipad = Array(16), opad = Array(16);
        for (var i = 0; i < 16; i++) {
            ipad[i] = bkey[i] ^ 0x36363636;
            opad[i] = bkey[i] ^ 0x5C5C5C5C;
        }
        var hash = this.binl_md5(ipad.concat(this.rstr2binl(data)), 512 + data.length * 8);
        return this.binl2rstr(this.binl_md5(opad.concat(hash), 512 + 128));
    };
    /*
     * Convert a raw string to a hex string
     */
    p.rstr2hex = function (input) {
        try {
            this.hexcase;
        }
        catch (e) {
            this.hexcase = 0;
        }
        var hex_tab = this.hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
        var output = "";
        var x;
        for (var i = 0; i < input.length; i++) {
            x = input.charCodeAt(i);
            output += hex_tab.charAt((x >>> 4) & 0x0F) + hex_tab.charAt(x & 0x0F);
        }
        return output;
    };
    /*
     * Convert a raw string to a base-64 string
     */
    p.rstr2b64 = function (input) {
        try {
            this.b64pad;
        }
        catch (e) {
            this.b64pad = '';
        }
        var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        var output = "";
        var len = input.length;
        for (var i = 0; i < len; i += 3) {
            var triplet = (input.charCodeAt(i) << 16) | (i + 1 < len ? input.charCodeAt(i + 1) << 8 : 0) | (i + 2 < len ? input.charCodeAt(i + 2) : 0);
            for (var j = 0; j < 4; j++) {
                if (i * 8 + j * 6 > input.length * 8)
                    output += this.b64pad;
                else
                    output += tab.charAt((triplet >>> 6 * (3 - j)) & 0x3F);
            }
        }
        return output;
    };
    /*
     * Convert a raw string to an arbitrary string encoding
     */
    p.rstr2any = function (input, encoding) {
        var divisor = encoding.length;
        var i, j, q, x, quotient;
        /* Convert to an array of 16-bit big-endian values, forming the dividend */
        var dividend = Array(Math.ceil(input.length / 2));
        for (i = 0; i < dividend.length; i++) {
            dividend[i] = (input.charCodeAt(i * 2) << 8) | input.charCodeAt(i * 2 + 1);
        }
        /*
         * Repeatedly perform a long division. The binary array forms the dividend,
         * the length of the encoding is the divisor. Once computed, the quotient
         * forms the dividend for the next step. All remainders are stored for later
         * use.
         */
        var full_length = Math.ceil(input.length * 8 / (Math.log(encoding.length) / Math.log(2)));
        var remainders = Array(full_length);
        for (j = 0; j < full_length; j++) {
            quotient = Array();
            x = 0;
            for (i = 0; i < dividend.length; i++) {
                x = (x << 16) + dividend[i];
                q = Math.floor(x / divisor);
                x -= q * divisor;
                if (quotient.length > 0 || q > 0)
                    quotient[quotient.length] = q;
            }
            remainders[j] = x;
            dividend = quotient;
        }
        /* Convert the remainders to the output string */
        var output = "";
        for (i = remainders.length - 1; i >= 0; i--)
            output += encoding.charAt(remainders[i]);
        return output;
    };
    /*
     * Encode a string as utf-8.
     * For efficiency, this assumes the input is valid utf-16.
     */
    p.str2rstr_utf8 = function (input) {
        var output = "";
        var i = -1;
        var x, y;
        while (++i < input.length) {
            /* Decode utf-16 surrogate pairs */
            x = input.charCodeAt(i);
            y = i + 1 < input.length ? input.charCodeAt(i + 1) : 0;
            if (0xD800 <= x && x <= 0xDBFF && 0xDC00 <= y && y <= 0xDFFF) {
                x = 0x10000 + ((x & 0x03FF) << 10) + (y & 0x03FF);
                i++;
            }
            /* Encode output as utf-8 */
            if (x <= 0x7F)
                output += String.fromCharCode(x);
            else if (x <= 0x7FF)
                output += String.fromCharCode(0xC0 | ((x >>> 6) & 0x1F), 0x80 | (x & 0x3F));
            else if (x <= 0xFFFF)
                output += String.fromCharCode(0xE0 | ((x >>> 12) & 0x0F), 0x80 | ((x >>> 6) & 0x3F), 0x80 | (x & 0x3F));
            else if (x <= 0x1FFFFF)
                output += String.fromCharCode(0xF0 | ((x >>> 18) & 0x07), 0x80 | ((x >>> 12) & 0x3F), 0x80 | ((x >>> 6) & 0x3F), 0x80 | (x & 0x3F));
        }
        return output;
    };
    /*
     * Encode a string as utf-16
     */
    p.str2rstr_utf16le = function (input) {
        var output = "";
        for (var i = 0; i < input.length; i++)
            output += String.fromCharCode(input.charCodeAt(i) & 0xFF, (input.charCodeAt(i) >>> 8) & 0xFF);
        return output;
    };
    p.str2rstr_utf16be = function (input) {
        var output = "";
        for (var i = 0; i < input.length; i++)
            output += String.fromCharCode((input.charCodeAt(i) >>> 8) & 0xFF, input.charCodeAt(i) & 0xFF);
        return output;
    };
    /*
     * Convert a raw string to an array of little-endian words
     * Characters >255 have their high-byte silently ignored.
     */
    p.rstr2binl = function (input) {
        var output = Array(input.length >> 2);
        for (var i = 0; i < output.length; i++)
            output[i] = 0;
        for (var i = 0; i < input.length * 8; i += 8)
            output[i >> 5] |= (input.charCodeAt(i / 8) & 0xFF) << (i % 32);
        return output;
    };
    /*
     * Convert an array of little-endian words to a string
     */
    p.binl2rstr = function (input) {
        var output = "";
        for (var i = 0; i < input.length * 32; i += 8)
            output += String.fromCharCode((input[i >> 5] >>> (i % 32)) & 0xFF);
        return output;
    };
    /*
     * Calculate the MD5 of an array of little-endian words, and a bit length.
     */
    p.binl_md5 = function (x, len) {
        /* append padding */
        x[len >> 5] |= 0x80 << ((len) % 32);
        x[(((len + 64) >>> 9) << 4) + 14] = len;
        var a = 1732584193;
        var b = -271733879;
        var c = -1732584194;
        var d = 271733878;
        for (var i = 0; i < x.length; i += 16) {
            var olda = a;
            var oldb = b;
            var oldc = c;
            var oldd = d;
            a = this.md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
            d = this.md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
            c = this.md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
            b = this.md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
            a = this.md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
            d = this.md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
            c = this.md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
            b = this.md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
            a = this.md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
            d = this.md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
            c = this.md5_ff(c, d, a, b, x[i + 10], 17, -42063);
            b = this.md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
            a = this.md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
            d = this.md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
            c = this.md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
            b = this.md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);
            a = this.md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
            d = this.md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
            c = this.md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
            b = this.md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
            a = this.md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
            d = this.md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
            c = this.md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
            b = this.md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
            a = this.md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
            d = this.md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
            c = this.md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
            b = this.md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
            a = this.md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
            d = this.md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
            c = this.md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
            b = this.md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);
            a = this.md5_hh(a, b, c, d, x[i + 5], 4, -378558);
            d = this.md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
            c = this.md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
            b = this.md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
            a = this.md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
            d = this.md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
            c = this.md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
            b = this.md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
            a = this.md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
            d = this.md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
            c = this.md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
            b = this.md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
            a = this.md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
            d = this.md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
            c = this.md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
            b = this.md5_hh(b, c, d, a, x[i + 2], 23, -995338651);
            a = this.md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
            d = this.md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
            c = this.md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
            b = this.md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
            a = this.md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
            d = this.md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
            c = this.md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
            b = this.md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
            a = this.md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
            d = this.md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
            c = this.md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
            b = this.md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
            a = this.md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
            d = this.md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
            c = this.md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
            b = this.md5_ii(b, c, d, a, x[i + 9], 21, -343485551);
            a = this.safe_add(a, olda);
            b = this.safe_add(b, oldb);
            c = this.safe_add(c, oldc);
            d = this.safe_add(d, oldd);
        }
        return [a, b, c, d];
    };
    /*
     * These privates implement the four basic operations the algorithm uses.
     */
    p.md5_cmn = function (q, a, b, x, s, t) {
        return this.safe_add(this.bit_rol(this.safe_add(this.safe_add(a, q), this.safe_add(x, t)), s), b);
    };
    p.md5_ff = function (a, b, c, d, x, s, t) {
        return this.md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
    };
    p.md5_gg = function (a, b, c, d, x, s, t) {
        return this.md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
    };
    p.md5_hh = function (a, b, c, d, x, s, t) {
        return this.md5_cmn(b ^ c ^ d, a, b, x, s, t);
    };
    p.md5_ii = function (a, b, c, d, x, s, t) {
        return this.md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
    };
    /*
     * Add integers, wrapping at 2^32. This uses 16-bit operations internally
     * to work around bugs in some JS interpreters.
     */
    p.safe_add = function (x, y) {
        var lsw = (x & 0xFFFF) + (y & 0xFFFF);
        var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return (msw << 16) | (lsw & 0xFFFF);
    };
    /*
     * Bitwise rotate a 32-bit number to the left.
     */
    p.bit_rol = function (num, cnt) {
        return (num << cnt) | (num >>> (32 - cnt));
    };
    return md5;
})();
egret.registerClass(md5,"md5");


var __define=this.__define||function(t,r,h,i){Object.defineProperty(t,r,{configurable:!0,enumerable:!0,get:h,set:i})},md5=function(){function t(){this.hexcase=0,this.b64pad=""}var r=t;return p=r.prototype,p.hex_md5=function(t){return this.rstr2hex(this.rstr_md5(this.str2rstr_utf8(t)))},p.b64_md5=function(t){return this.rstr2b64(this.rstr_md5(this.str2rstr_utf8(t)))},p.any_md5=function(t,r){return this.rstr2any(this.rstr_md5(this.str2rstr_utf8(t)),r)},p.hex_hmac_md5=function(t,r){return this.rstr2hex(this.rstr_hmac_md5(this.str2rstr_utf8(t),this.str2rstr_utf8(r)))},p.b64_hmac_md5=function(t,r){return this.rstr2b64(this.rstr_hmac_md5(this.str2rstr_utf8(t),this.str2rstr_utf8(r)))},p.any_hmac_md5=function(t,r,h){return this.rstr2any(this.rstr_hmac_md5(this.str2rstr_utf8(t),this.str2rstr_utf8(r)),h)},p.md5_vm_test=function(){return"900150983cd24fb0d6963f7d28e17f72"==this.hex_md5("abc").toLowerCase()},p.rstr_md5=function(t){return this.binl2rstr(this.binl_md5(this.rstr2binl(t),8*t.length))},p.rstr_hmac_md5=function(t,r){var h=this.rstr2binl(t);h.length>16&&(h=this.binl_md5(h,8*t.length));for(var i=Array(16),s=Array(16),d=0;16>d;d++)i[d]=909522486^h[d],s[d]=1549556828^h[d];var n=this.binl_md5(i.concat(this.rstr2binl(r)),512+8*r.length);return this.binl2rstr(this.binl_md5(s.concat(n),640))},p.rstr2hex=function(t){try{this.hexcase}catch(r){this.hexcase=0}for(var h,i=this.hexcase?"0123456789ABCDEF":"0123456789abcdef",s="",d=0;d<t.length;d++)h=t.charCodeAt(d),s+=i.charAt(h>>>4&15)+i.charAt(15&h);return s},p.rstr2b64=function(t){try{this.b64pad}catch(r){this.b64pad=""}for(var h="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",i="",s=t.length,d=0;s>d;d+=3)for(var n=t.charCodeAt(d)<<16|(s>d+1?t.charCodeAt(d+1)<<8:0)|(s>d+2?t.charCodeAt(d+2):0),_=0;4>_;_++)i+=8*d+6*_>8*t.length?this.b64pad:h.charAt(n>>>6*(3-_)&63);return i},p.rstr2any=function(t,r){var h,i,s,d,n,_=r.length,e=Array(Math.ceil(t.length/2));for(h=0;h<e.length;h++)e[h]=t.charCodeAt(2*h)<<8|t.charCodeAt(2*h+1);var m=Math.ceil(8*t.length/(Math.log(r.length)/Math.log(2))),f=Array(m);for(i=0;m>i;i++){for(n=Array(),d=0,h=0;h<e.length;h++)d=(d<<16)+e[h],s=Math.floor(d/_),d-=s*_,(n.length>0||s>0)&&(n[n.length]=s);f[i]=d,e=n}var a="";for(h=f.length-1;h>=0;h--)a+=r.charAt(f[h]);return a},p.str2rstr_utf8=function(t){for(var r,h,i="",s=-1;++s<t.length;)r=t.charCodeAt(s),h=s+1<t.length?t.charCodeAt(s+1):0,r>=55296&&56319>=r&&h>=56320&&57343>=h&&(r=65536+((1023&r)<<10)+(1023&h),s++),127>=r?i+=String.fromCharCode(r):2047>=r?i+=String.fromCharCode(192|r>>>6&31,128|63&r):65535>=r?i+=String.fromCharCode(224|r>>>12&15,128|r>>>6&63,128|63&r):2097151>=r&&(i+=String.fromCharCode(240|r>>>18&7,128|r>>>12&63,128|r>>>6&63,128|63&r));return i},p.str2rstr_utf16le=function(t){for(var r="",h=0;h<t.length;h++)r+=String.fromCharCode(255&t.charCodeAt(h),t.charCodeAt(h)>>>8&255);return r},p.str2rstr_utf16be=function(t){for(var r="",h=0;h<t.length;h++)r+=String.fromCharCode(t.charCodeAt(h)>>>8&255,255&t.charCodeAt(h));return r},p.rstr2binl=function(t){for(var r=Array(t.length>>2),h=0;h<r.length;h++)r[h]=0;for(var h=0;h<8*t.length;h+=8)r[h>>5]|=(255&t.charCodeAt(h/8))<<h%32;return r},p.binl2rstr=function(t){for(var r="",h=0;h<32*t.length;h+=8)r+=String.fromCharCode(t[h>>5]>>>h%32&255);return r},p.binl_md5=function(t,r){t[r>>5]|=128<<r%32,t[(r+64>>>9<<4)+14]=r;for(var h=1732584193,i=-271733879,s=-1732584194,d=271733878,n=0;n<t.length;n+=16){var _=h,e=i,m=s,f=d;h=this.md5_ff(h,i,s,d,t[n+0],7,-680876936),d=this.md5_ff(d,h,i,s,t[n+1],12,-389564586),s=this.md5_ff(s,d,h,i,t[n+2],17,606105819),i=this.md5_ff(i,s,d,h,t[n+3],22,-1044525330),h=this.md5_ff(h,i,s,d,t[n+4],7,-176418897),d=this.md5_ff(d,h,i,s,t[n+5],12,1200080426),s=this.md5_ff(s,d,h,i,t[n+6],17,-1473231341),i=this.md5_ff(i,s,d,h,t[n+7],22,-45705983),h=this.md5_ff(h,i,s,d,t[n+8],7,1770035416),d=this.md5_ff(d,h,i,s,t[n+9],12,-1958414417),s=this.md5_ff(s,d,h,i,t[n+10],17,-42063),i=this.md5_ff(i,s,d,h,t[n+11],22,-1990404162),h=this.md5_ff(h,i,s,d,t[n+12],7,1804603682),d=this.md5_ff(d,h,i,s,t[n+13],12,-40341101),s=this.md5_ff(s,d,h,i,t[n+14],17,-1502002290),i=this.md5_ff(i,s,d,h,t[n+15],22,1236535329),h=this.md5_gg(h,i,s,d,t[n+1],5,-165796510),d=this.md5_gg(d,h,i,s,t[n+6],9,-1069501632),s=this.md5_gg(s,d,h,i,t[n+11],14,643717713),i=this.md5_gg(i,s,d,h,t[n+0],20,-373897302),h=this.md5_gg(h,i,s,d,t[n+5],5,-701558691),d=this.md5_gg(d,h,i,s,t[n+10],9,38016083),s=this.md5_gg(s,d,h,i,t[n+15],14,-660478335),i=this.md5_gg(i,s,d,h,t[n+4],20,-405537848),h=this.md5_gg(h,i,s,d,t[n+9],5,568446438),d=this.md5_gg(d,h,i,s,t[n+14],9,-1019803690),s=this.md5_gg(s,d,h,i,t[n+3],14,-187363961),i=this.md5_gg(i,s,d,h,t[n+8],20,1163531501),h=this.md5_gg(h,i,s,d,t[n+13],5,-1444681467),d=this.md5_gg(d,h,i,s,t[n+2],9,-51403784),s=this.md5_gg(s,d,h,i,t[n+7],14,1735328473),i=this.md5_gg(i,s,d,h,t[n+12],20,-1926607734),h=this.md5_hh(h,i,s,d,t[n+5],4,-378558),d=this.md5_hh(d,h,i,s,t[n+8],11,-2022574463),s=this.md5_hh(s,d,h,i,t[n+11],16,1839030562),i=this.md5_hh(i,s,d,h,t[n+14],23,-35309556),h=this.md5_hh(h,i,s,d,t[n+1],4,-1530992060),d=this.md5_hh(d,h,i,s,t[n+4],11,1272893353),s=this.md5_hh(s,d,h,i,t[n+7],16,-155497632),i=this.md5_hh(i,s,d,h,t[n+10],23,-1094730640),h=this.md5_hh(h,i,s,d,t[n+13],4,681279174),d=this.md5_hh(d,h,i,s,t[n+0],11,-358537222),s=this.md5_hh(s,d,h,i,t[n+3],16,-722521979),i=this.md5_hh(i,s,d,h,t[n+6],23,76029189),h=this.md5_hh(h,i,s,d,t[n+9],4,-640364487),d=this.md5_hh(d,h,i,s,t[n+12],11,-421815835),s=this.md5_hh(s,d,h,i,t[n+15],16,530742520),i=this.md5_hh(i,s,d,h,t[n+2],23,-995338651),h=this.md5_ii(h,i,s,d,t[n+0],6,-198630844),d=this.md5_ii(d,h,i,s,t[n+7],10,1126891415),s=this.md5_ii(s,d,h,i,t[n+14],15,-1416354905),i=this.md5_ii(i,s,d,h,t[n+5],21,-57434055),h=this.md5_ii(h,i,s,d,t[n+12],6,1700485571),d=this.md5_ii(d,h,i,s,t[n+3],10,-1894986606),s=this.md5_ii(s,d,h,i,t[n+10],15,-1051523),i=this.md5_ii(i,s,d,h,t[n+1],21,-2054922799),h=this.md5_ii(h,i,s,d,t[n+8],6,1873313359),d=this.md5_ii(d,h,i,s,t[n+15],10,-30611744),s=this.md5_ii(s,d,h,i,t[n+6],15,-1560198380),i=this.md5_ii(i,s,d,h,t[n+13],21,1309151649),h=this.md5_ii(h,i,s,d,t[n+4],6,-145523070),d=this.md5_ii(d,h,i,s,t[n+11],10,-1120210379),s=this.md5_ii(s,d,h,i,t[n+2],15,718787259),i=this.md5_ii(i,s,d,h,t[n+9],21,-343485551),h=this.safe_add(h,_),i=this.safe_add(i,e),s=this.safe_add(s,m),d=this.safe_add(d,f)}return[h,i,s,d]},p.md5_cmn=function(t,r,h,i,s,d){return this.safe_add(this.bit_rol(this.safe_add(this.safe_add(r,t),this.safe_add(i,d)),s),h)},p.md5_ff=function(t,r,h,i,s,d,n){return this.md5_cmn(r&h|~r&i,t,r,s,d,n)},p.md5_gg=function(t,r,h,i,s,d,n){return this.md5_cmn(r&i|h&~i,t,r,s,d,n)},p.md5_hh=function(t,r,h,i,s,d,n){return this.md5_cmn(r^h^i,t,r,s,d,n)},p.md5_ii=function(t,r,h,i,s,d,n){return this.md5_cmn(h^(r|~i),t,r,s,d,n)},p.safe_add=function(t,r){var h=(65535&t)+(65535&r),i=(t>>16)+(r>>16)+(h>>16);return i<<16|65535&h},p.bit_rol=function(t,r){return t<<r|t>>>32-r},t}();egret.registerClass(md5,"md5");
