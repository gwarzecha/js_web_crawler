import { test, expect } from '@jest/globals';
import { getURLsFromHTML, normalizeURL } from './crawl';

test('normalizeURL secure protocol without slash', () => {
  const input = 'https://blog.boot.dev/path';
  const actual = normalizeURL(input);
  const expected = 'blog.boot.dev/path';
  expect(actual).toBe(expected);
});

test('nomalizedURL secure protocol with slash', () => {
  const input = 'https://blog.boot.dev/path/';
  const actual = normalizeURL(input);
  const expected = 'blog.boot.dev/path';
  expect(actual).toBe(expected);
});

test('normalizedURL unsecure protocol', () => {
  const input = 'http://blog.boot.dev/path';
  const actual = normalizeURL(input);
  const expected = 'blog.boot.dev/path';
  expect(actual).toBe(expected);
});

test('normalizedURL unsecure protocol with slash', () => {
  const input = 'http://blog.boot.dev/path/';
  const actual = normalizeURL(input);
  const expected = 'blog.boot.dev/path';
  expect(actual).toBe(expected);
});

test('normalizedURL caps', () => {
  const input = 'HTTP://BLOG.BOOT.DEV/path';
  const actual = normalizeURL(input);
  const expected = 'blog.boot.dev/path';
  expect(actual).toBe(expected);
});

test('Relative to absolute URLs', () => {
  const htmlBody = `
    <html>
      <body>
        <a href="https://example.com/page1">Example Page 1</a>
        <a href="/page2">Example Page 2</a>
        <a href="page3">Example Page 3</a>
      </body>
    </html>`;
  const baseURL = 'https://example.com';

  const expected = [
    'https://example.com/page1',
    'https://example.com/page2',
    'https://example.com/page3',
  ];

  const actual = getURLsFromHTML(htmlBody, baseURL);
  expect(actual).toEqual(expected);
});

test('Find all anchor elements', () => {
  const htmlBody = `
  <html>
    <body>
        <a href="https://example.com/page1">Example Page 1</a>
        <a href="/page2">Example Page 2</a>
        <a href="page3">Example Page 3</a>
        <a href="//example.com/page4">Example Page 4</a>
        <a href="https://example.com/page5">Example Page 5</a>
      </body>
  </html>
  `;
  const baseURL = 'https://example.com';

  const expected = [
    'https://example.com/page1',
    'https://example.com/page2',
    'https://example.com/page3',
    'https://example.com/page4',
    'https://example.com/page5',
  ];

  const actual = getURLsFromHTML(htmlBody, baseURL);
  expect(actual).toEqual(expected);
});
