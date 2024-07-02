const normalizeURL = (rawUrl) => {
  const urlObj = new URL(rawUrl);
  let newURL = `${urlObj.host}${urlObj.pathname}`;
  if (newURL.slice(-1) === '/') {
    newURL = newURL.slice(0, -1);
  }
  return newURL;
};

export { normalizeURL };
