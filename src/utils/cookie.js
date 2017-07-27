

function encode(value) {
  return encodeURIComponent(value);
}

function decode(value) {
  return decodeURIComponent(value);
}

function stringifyCookieValue(value) {
  return encode(value);
}

function parseCookieValue(s) {
  var pluses = /\+/g;
  if (s.indexOf('"') === 0) {
    // This is a quoted cookie as according to RFC2068, unescape...
    s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
  }

  try {
    s = decode(s.replace(pluses, ' '));
    return s;
  } catch (e) { }
}

function read(s, converter) {
  var value = parseCookieValue(s);
  return converter ? converter(value) : value;
}


export function setCookie(key, value, options) {
  return (document.cookie = [
    encode(key), '=', stringifyCookieValue(value),
    options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
    options.path ? '; path=' + options.path : '',
    options.domain ? '; domain=' + options.domain : '',
    options.secure ? '; secure' : ''
  ].join(''));
}

export function getCookie(key) {
  var result = key ? undefined : {},
    cookies = document.cookie ? document.cookie.split('; ') : [],
    i = 0,
    l = cookies.length;

  for (; i < l; i++) {
    var parts = cookies[i].split('='),
      name = decode(parts.shift()),
      cookie = parts.join('=');

    if (key === name) {
      // If second argument (value) is a function it's a converter...
      result = read(cookie);
      break;
    }

    // Prevent storing a cookie that we couldn't decode.
    if (!key && (cookie = read(cookie)) !== undefined) {
      result[name] = cookie;
    }
  }
  return result;
}