/**
 * Project: Bookshelf API Pro
 * Author: Muhammad Raihan
 */

const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const init = async () => {
  const server = Hapi.server({
    port: 9000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  server.route(routes);

  await server.start();

  console.log(`Server anda berjalan pada ${server.info.uri}`);
  console.log('-----------------------------------------------------------');
  console.log('Source code ini dibuat oleh Muhammad Raihan.');
  console.log('Gunakan hanya untuk pembelajaran, jangan ubah pembuat asli.');
  console.log('Berkaryalah sesuai ide anda, silakan recode dengan tetap');
  console.log('mencantumkan nama pembuat asli.');
  console.log('-----------------------------------------------------------');
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
