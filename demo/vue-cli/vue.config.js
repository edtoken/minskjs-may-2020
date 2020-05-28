const getHeaders = require('../get-headers');
const env = require('./load-env');

module.exports = {
    chainWebpack: config => {
        config.devtool('cheap-module-source-map');

        // option 1 - simple static headers
        config.devServer.headers({'custom-header': 'custom-value'});

        // option 2 - smart headers
        config.devServer.before((app) => {
            app.use((req, res, next) => {
                const headers = getHeaders(req.path, env);
                Object.keys(headers)
                    .forEach(
                        name => res.setHeader(name, headers[name]),
                    );
                next();
            });
        });
    },
};
