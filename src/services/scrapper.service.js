'use strict';

class Scrapper {

  constructor() {}

  async scrapePage(browser, url) {
    try {
      const page = await browser.newPage();
      await page.goto(url);
      const title = await page.title();
      const links = await this.collectPageLinks(page);
      if (page) {
        await page.close();
      }
      return {
        url,
        title,
        links: this.uniqueLinks(links)
      };
    } catch (err) {
      console.log('Error while trying to scrape: [' +  url + '] Error Message: ' + err );
      return err;
    }
  }

  uniqueLinks(links) {
    const validLinks = links.filter(link => link.startsWith('http'));
    return [...new Set(validLinks)];
  }

  collectPageLinks(page) {
   return page.evaluate(() => Array.from(document.body.querySelectorAll('a[href]'), ({ href }) => href));
  }

}

module.exports =  Scrapper;
