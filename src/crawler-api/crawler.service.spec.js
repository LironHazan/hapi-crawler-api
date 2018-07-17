const expect = require('chai').expect;
const Crawler = require('../test/crawler.service.org');
const crawler = new Crawler();

describe('testing scrape()', () =>  {
  it('scrape', (done) => {
    const args = {url: 'https://www.blogger.com/about/?r=1-null_user#maincontent', max_depth: 2, max_pages: 20};
    crawler.scrape(args)
      .then((result) => {
      console.log('result');
      done();
      })
      .catch(err => {
        console.log(err);
        done(err);
      });
  });
});
