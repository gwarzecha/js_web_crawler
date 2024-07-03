import { JSDOM } from 'jsdom';

const normalizeURL = (rawUrl) => {
  const urlObj = new URL(rawUrl);
  let newURL = `${urlObj.host}${urlObj.pathname}`;
  if (newURL.slice(-1) === '/') {
    newURL = newURL.slice(0, -1);
  }
  return newURL;
};

export { normalizeURL };

const getURLsFromHTML = (htmlBody, baseURL) => {
  const urls = [];
  const dom = new JSDOM(htmlBody);
  const anchors = dom.window.document.querySelectorAll('a');

  for (const anchor of anchors) {
    if (anchor.hasAttribute('href')) {
      let href = anchor.getAttribute('href');
      try {
        href = new URL(href, baseURL).href;
        urls.push(href);
      } catch (err) {
        console.log(`${err.message}: ${href}`);
      }
    }
  }
  return urls;
};

export { getURLsFromHTML };
