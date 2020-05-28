const path = require('path');
const express = require('express');
const app = express();
const env = require('./load-env');


const getHeaders = require('../get-headers');
const STATIC_APP_PORT = process.env.APP_SERVER_PORT || 3000;

app.use(function (req, res, next) {

    const headers = getHeaders(req.path, env);
    // allow inline css
    headers['Content-Security-Policy'] = headers['Content-Security-Policy'].replace("style-src-elem 'self'", "style-src-elem 'self' 'unsafe-inline'")

    Object.keys(headers)
        .forEach(name => {
            res.setHeader(name, headers[name]);
        });
    return next();
});

app.get('/', (req, res) => res.redirect('/index.html'));

app.use(express.static(path.resolve(__dirname, './app')));

app.listen(STATIC_APP_PORT, () => {
    console.log(`static-app http://localhost:${STATIC_APP_PORT}`);
});

