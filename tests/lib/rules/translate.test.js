var RuleTester = require('eslint').RuleTester;

var rule = require('../../../lib/rules/translate');

const parserOptions = { ecmaVersion: 2015 };

var ruleTester = new RuleTester();
ruleTester.run('translate', rule, {
    valid: [
        {
            code: 'translate(`a`)',
            parserOptions,
        },
        {
            code: "translate('a')",
            parserOptions,
        },
    ],
    invalid: [
        {
            code: 'translate()',
            parserOptions,
            errors: [{ messageId: 'noArgument' }],
        },
        {
            code: 'translate(null)',
            parserOptions,
            errors: [{ messageId: 'nullArgument' }],
        },
        {
            code: "translate('a' + a)",
            parserOptions,
            errors: [{ messageId: 'noLiteralArgument' }],
        },
        {
            code: 'translate(a)',
            parserOptions,
            errors: [{ messageId: 'noLiteralArgument' }],
        },
        {
            code: 'translate(`${a}`)',
            parserOptions,
            errors: [{ messageId: 'dynamicLiteralArgument' }],
        },
    ],
});
