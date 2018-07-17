'use strict';
const controller = require('./crawler.controller');

module.exports = [
  {
    method: 'POST',
    path: '/crawler/scrape',
    config:{
      handler: controller.scrape
    }
  },
  {
    method: 'GET',
    path: '/crawler/model',
    config:{
      handler: controller.getCrawledPages
    }
  }
];