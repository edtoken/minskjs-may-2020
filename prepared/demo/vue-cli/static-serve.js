const handler = require('serve-handler');
const http = require('http');

const getHeaders = require('../get-headers');
const env = require('./load-env');

const server = http.createServer((req, res) => {

    const headers = getHeaders(req.url, env);

    Object.keys(headers)
        .forEach(
            name => res.setHeader(name, headers[name]),
        );

    return handler(req, res, {
        public: 'dist',
    });
});

server.listen(3000, () => {
    console.log('Running at http://localhost:3000');
});
