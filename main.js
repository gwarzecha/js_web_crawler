import { crawlPage } from './crawl.js';
import { printReport } from './report.js';

const main = async () => {
  if (process.argv.length < 3) {
    console.log('Base URL is required');
    process.exit(1);
  }
  if (process.argv.length > 3) {
    console.log('Too many arguments passed');
    process.exit(1);
  }

  const baseURL = process.argv[2];
  console.log(`Crawling ${baseURL}`);
  const pages = await crawlPage(baseURL);
  printReport(pages);
};

main();
