'use strict';

const pageModel = require('./crawler.model');
const conf = require('../../conf.json');
const puppeteer = require('puppeteer');
const Scrapper = require('../services/scrapper.service');
class Crawler {

  // root: links:[a,b,c]
  // page 1    a: links: [d,e]         depth 1
  //              d: links: [i, j]     depth 2
  //              e: links: []
  // page 2    b: links: [f,g,h]       depth 1

  constructor() {
    this.scrapper = new Scrapper();
  }

  scrape({url, max_depth, max_pages}) {
    console.log('launching puppeteer');
    let browserRef;
    let pageRef;
    return puppeteer.launch({headless: conf.headless})
      .then(browser => {
        browserRef = browser;
        return this.composeRootNode(browser, url)
      })
      .then(root => this.storePage(root))
      .then(root => this.traverse(browserRef, root, max_depth, max_pages))
      .then((res) => res)
      .catch(async (err) => {
        await pageRef.close();
        await browserRef.close();
        return err;
      })
      .finally(() => browserRef.close())
  }

  composeRootNode(browser, url) {
    return this.scrapper.scrapePage(browser, url)
      .then(({title, links}) =>  {
      return {title, depth: 0, url, links};
    });
  }

  async traverse(browser, root, max_depth, max_pages) {
    let maxPages = parseInt(max_pages);
    let maxDepth = parseInt(max_depth);
    root.links = root.links.length > maxPages ? root.links.slice(0, maxPages) : root.links;
    let queue = [root];
    let node;
    let pagesCount = 0;
    while (queue.length > 0) {
    node = queue.shift();
    console.log('crawling page :  [' + node.url + ']');
    try {
      console.log('node links length: ' + node.links.length);
      for (let i = 1; i < node.links.length; i++) {
        pagesCount = pagesCount +1;

        console.log('pagesCount: ' + pagesCount + ' maxPages: ' + maxPages);

        if (pagesCount >= maxPages || node.depth >= maxDepth) {
          console.log('reached max depth or max pages! reset queue');
          queue = [];
          break;
        }
       const {url, title, links} = await this.scrapper.scrapePage(browser, node.links[i]);
       const nextPage = {title, depth: node.depth + 1, url, links};
       if (nextPage.links && nextPage.links.length > 0) {
         console.log('pushing child to queue: child-index' + i +' depth: ' + nextPage.depth);
         await this.storePage(nextPage);
         queue.push(nextPage);
       }
     }

    } catch (err) {
      return err;
    }
    }
  }

  storePage(node) {
    return pageModel.create({title: node.title, depth: node.depth, url: node.url, links: node.links});
  }
}


module.exports = Crawler;

