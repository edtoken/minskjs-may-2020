const fs = require('fs');
const path = require('path');
const YAML = require('yaml');

const config = YAML.parse(fs.readFileSync(path.resolve(__dirname, './headers.yml'), 'utf8')).headers;
const replaces = config.map(({pattern, ...other}) => ({pattern, regex: new RegExp(pattern), ...other}));

module.exports = function getHeaders(path, env = {}) {
    const output = {};
    const envReplaces = Object.keys(env);
    const hasEnvReplaces = !!envReplaces.length;

    replaces.forEach(({regex, headers}) => {
        if (regex.test(path)) {
            headers.forEach((({key, value}) => {
                output[key] = value;

                if (hasEnvReplaces) {
                    envReplaces.forEach(envKey => {
                        output[key] = output[key].replace(envKey, env[envKey]);
                    });
                }
            }));
        }
    });

    return output;
};
