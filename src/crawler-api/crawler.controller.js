'use strict';
const CrawlerService = require('./crawler.service');
const pageModel = require('./crawler.model');

module.exports = {

  scrape: (request, h) => {
    console.log(JSON.stringify(request.payload));
    if (!request.payload.url || !request.payload.max_depth || !request.payload.max_pages) {
      return h.response({err: 'missing params'}).code(400);
    }
    const {url, max_depth, max_pages} = request.payload;
    const crawlerService = new CrawlerService();
    return crawlerService.scrape({url, max_depth, max_pages})
      .then((result) => {
       console.log('crawling was ended: ');
      return h.response({result})
    }).catch((err) => h.response({err}));
  },

  getCrawledPages: (request, h) => {
    return pageModel.countDocuments()
      .then((pages) => {
      return h.response({pages})
      });
  }
};