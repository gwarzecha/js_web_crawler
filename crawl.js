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

const crawlPage = async (url) => {
  console.log(`Crawling ${url}`);

  let res;
  try {
    res = await fetch(url);
  } catch (err) {
    console.log(`${err.message}`);
  }

  if (res.status > 399) {
    console.log(`${err.message}`);
  }

  const contentType = res.headers.get('content-type');
  if (!contentType || !contentType.includes('text/html')) {
    console.log(`Got non-html response: ${contentType}`);
    return;
  }

  console.log(await res.text());
};

export { getURLsFromHTML, normalizeURL, crawlPage };
