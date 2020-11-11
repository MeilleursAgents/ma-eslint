const recommended = require('./recommended');
const translate = require('./lib/rules/translate');

module.exports = {
    configs: {
        recommended,
    },
    rules: {
        translate,
    },
};
