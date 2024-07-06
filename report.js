const printReport = (pages) => {
  console.log('Printed report generating...');
  const sortedPages = sortPages(pages);
  for (const sortedPage of sortedPages) {
    const url = sortedPage[0];
    const count = sortedPage[1];
    console.log(`Found ${count} links to ${url}`);
  }
};

const sortPages = (pages) => {
  const pagesArray = Object.entries(pages);
  pagesArray.sort((a, b) => {
    if (a[1] === b[1]) {
      return a[0].localeCompare(b[0]);
    }
    return b[1] - a[1];
  });
  return pagesArray;
};

export { printReport, sortPages };
