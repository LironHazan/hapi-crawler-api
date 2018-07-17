const expect = require('chai').expect;
const Scrapper = require('./scrapper.service');
const scrapper = new Scrapper();

xdescribe('testing scrapePage()', () =>  {
  it('scrapePage should return the page title and a list of its links', () => {
    scrapper.scrapePage(browser, 'https://www.google.com/')
      .then(({title, links}) => {
      expect(title).to.be.equal('Google');
      expect(links.length > 0).to.be.equal(true);
      })
      .catch(err => console.log(err));
  });
});
