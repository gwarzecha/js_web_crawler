import { JSDOM } from 'jsdom';

const normalizeURL = (rawUrl) => {
  const urlObj = new URL(rawUrl);
  let newURL = `${urlObj.host}${urlObj.pathname}`;
  if (newURL.slice(-1) === '/') {
    newURL = newURL.slice(0, -1);
  }
  return newURL;
};

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

const fetchHTML = async (url) => {
  let res;
  try {
    res = await fetch(url);
  } catch (err) {
    throw new Error(`Got Network error: ${err.message}`);
  }

  if (res.status > 399) {
    throw new Error(`Got HTTP error: ${res.status} ${res.statusText}`);
  }

  const contentType = res.headers.get('content-type');
  if (!contentType || !contentType.includes('text/html')) {
    throw new Error(`Got non-HTML response: ${contentType}`);
  }

  return res.text();
};

const crawlPage = async (baseURL, currentURL = baseURL, pages = {}) => {
  const currentURLObj = new URL(currentURL);
  const baseURLObj = new URL(baseURL);

  if (currentURLObj.hostname !== baseURLObj.hostname) {
    return pages;
  }

  const normalizedCurrentURL = normalizeURL(currentURL);

  if (pages[normalizedCurrentURL]) {
    pages[normalizedCurrentURL]++;
    return pages;
  }
  pages[normalizedCurrentURL] = 1;

  let html = '';
  try {
    html = await fetchHTML(currentURL);
  } catch (err) {
    console.log(`${err.message}`);
    return pages;
  }

  const nextURLs = getURLsFromHTML(html, baseURL);
  for (const nextURL of nextURLs) {
    await crawlPage(baseURL, nextURL, pages);
  }
  return pages;
};

export { getURLsFromHTML, normalizeURL, crawlPage };
