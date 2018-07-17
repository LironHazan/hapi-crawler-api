'use strict';
const Hapi = require('hapi');
const mongoose = require('mongoose');
const routes = require('./src/routes');
const config = require('./conf.json');

const server = Hapi.server({
  port: config.port,
  host: config.host,
  routes: {
    cors: true
  }
});

const init = async () => {
  mongoose.connect(config.db, { useNewUrlParser: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.error(err));
  await server.start();
  return server;
};

process.on('unhandledRejection', (err) => {
  console.log(err);
process.exit(1);
});

server.route(routes);

init()
  .then(() => console.log(`Server running at: ${server.info.uri}`))
  .catch(err =>   console.log(err));