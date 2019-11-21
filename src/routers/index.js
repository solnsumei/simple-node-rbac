const fs = require('fs');
const path = require('path');


const initializeRoutes = (app, config) => {
  const { API_VERSION: apiVersion } = config;

  const files = fs.readdirSync(path.resolve(__dirname, `./${apiVersion}/`));
  files.forEach((file) => {
    const filename = `./${apiVersion}/${file.split('.')[0]}`;

    /* eslint-disable global-require */
    // eslint-disable-next-line import/no-dynamic-require
    const router = require(filename);

    app.use(router.routes()).use(router.allowedMethods({
      throw: true,
    }));
  });
};

module.exports = initializeRoutes;
