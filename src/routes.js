const crawler = require('./crawler-api/routes');

module.exports = [
  {
    method: 'GET',
    path: '/crawler',
    handler: (request, h) => {
      return h.response({up: 'UP AND RUNNING'})
    }
  },
  ...crawler
];