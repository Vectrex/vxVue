/**
 * enabled (): check whether setting cookies is possible
 * get (name): get value of key <name>
 * getAll (): get all key-value-pairs as object
 * set (name, value[, options = {}]): set key <name> to value
 * getRaw (name): get value of key <name> without URI component decoding
 * setRaw (name, value[, options = {}]): set key <name> to value without URI component encoding
 * remove (name[, options = {}]): remove a cookie by setting the expiration to -1
 */

const computeExpires = (str) => {
    const value = parseInt(str, 10);
    let expires = new Date();

    switch (str.substr(-1)) {
        case 'Y': expires.setFullYear(expires.getFullYear() + value); break;
        case 'M': expires.setMonth(expires.getMonth() + value); break;
        case 'D': expires.setDate(expires.getDate() + value); break;
        case 'h': expires.setHours(expires.getHours() + value); break;
        case 'm': expires.setMinutes(expires.getMinutes() + value); break;
        case 's': expires.setSeconds(expires.getSeconds() + value); break;
        default: expires = new Date(str);
    }
    return expires;
}

const conv = (opts) => {
    let res = '';

    Object.getOwnPropertyNames(opts).forEach(
        key => {
            if (key.toLowerCase() === 'expires') {
                let expires = opts[key];

                if (!(expires instanceof Date)) {
                    expires += typeof expires === 'number' ? 'D' : '';
                    expires = computeExpires(expires);
                }
                res += ';' + key + '=' + expires.toUTCString();

            } else if (key.toLowerCase() === 'secure') {
                if (opts[key]) {
                    res += ';' + key;
                }

            } else {
                res += ';' + key + '=' + opts[key];
            }
        }
    );
    if(!opts.hasOwnProperty('path')) {
        res += ';path=/';
    }
    return res;
}

function enabled () {
    const key = '__vx__' + Math.random();
    document.cookie = key + '=1' + ';path=/';
    if((new RegExp('(?:^|; )' + key + '=1' + '(?:;|$)')).test(document.cookie)) {
        remove(key);
        return true;
    }
    return false;
}

function get (key) {
    const raw = getRaw(key);
    return  raw ? decodeURIComponent(raw) : null;
}

function set (key, val, options = {}) {
    document.cookie = key + '=' + encodeURIComponent(val) + conv(options);
}

function getAll () {
    const reKey = /(?:^|; )([^=]+?)(?:=([^;]*))?(?:;|$)/g, cookies = {};
    let match;

    while ((match = reKey.exec(document.cookie))) {
        reKey.lastIndex = (match.index + match.length) - 1;
        cookies[match[1]] = decodeURIComponent(match[2]);
    }

    return cookies;
}

function remove (key, options = {}) {
    return set (key, '',{ ...options, ...{ expires: -1 }});
}

function setRaw (key, val, options) {
    document.cookie = key + '=' + val + conv(options);
}

function getRaw (key) {
    const escKey = key.replace(/[.*+?^$|[\](){}\\-]/g, '\\$&');
    const match = (new RegExp('(?:^|; )' + escKey + '(?:=([^;]*))?(?:;|$)').exec(document.cookie));
    if(match === null) {
        return null;
    }
    return match[1];
}

export {
    enabled,
    get,
    getAll,
    set,
    getRaw,
    setRaw,
    remove
}