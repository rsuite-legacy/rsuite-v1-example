export function spliceURL(url, params) {
  const esc = encodeURIComponent;
  const nextParams = { ...params };
  let nextURL;
  if (typeof url === 'object') {
    let keys = url.getKeys();
    nextURL = url.toStringURL(nextParams);
    keys.forEach(key => delete nextParams[key]);
  } else {
    nextURL = url;
  }

  if (nextParams) {
    const paramArray = [];
    for (let key in nextParams) {
      if (nextParams[key] === null || nextParams[key] === undefined) {
        continue;
      }
      if (Array.isArray(nextParams[key])) {
        nextParams[key].map((value) => {
          value && paramArray.push(`${esc(key)}=${esc(value)}`);
        });
        continue;
      }
      paramArray.push(`${esc(key)}=${esc(nextParams[key])}`);
    }
    nextURL += ((nextURL.indexOf('?') === -1) ? '?' : '&') + paramArray.join('&');
  };

  return nextURL;
}