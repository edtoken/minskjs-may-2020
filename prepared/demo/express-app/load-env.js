/**
 *
 * Load the environment variables from .env into the process.env
 * @see env.example
 *
 */
const fs = require('fs');

// load custom local variables
if (fs.existsSync('.env.local')) {
    require('dotenv').config({debug: false, path: './.env.local'});
}

require('dotenv').config({debug: false, path: './.env'});

// print env values
const keys = Object.keys(process.env)
    .filter(key => key.indexOf('APP_') === 0)
    .sort();

keys.forEach(key => {
    console.log(`${key}: ${process.env[key]}`);
});

module.exports = keys.reduce((memo, key) => ({...memo, [key]: process.env[key]}), {});
