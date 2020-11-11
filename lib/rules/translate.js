module.exports = {
    meta: {
        docs: {
            description: 'enforce use of literals in @ma-js-common/translate function.',
            category: 'Possible Errors',
        },
        schema: [],
        type: 'problem',
        recommmended: true,
        messages: {
            noArgument: 'Method translate() called without only one argument',
            nullArgument: 'Method translate() called with first argument null',
            noLiteralArgument: 'Method translate() called without literals',
            dynamicLiteralArgument: 'Method translate() called with dynamic template strings',
        },
    },
    create(context) {
        return {
            CallExpression: function (node) {
                // Using https://astexplorer.net/ to explore code structure
                var callee = node.callee;
                var args = node.arguments;

                if (callee.name !== 'translate') {
                    return;
                }

                if (args.length === 0) {
                    context.report({ node, messageId: 'noArgument' });
                    return;
                }

                const arg = args[0];
                if (arg.value === null) {
                    context.report({ node, messageId: 'nullArgument' });
                }

                if (arg.type !== 'TemplateLiteral' && arg.type !== 'Literal') {
                    context.report({ node, messageId: 'noLiteralArgument' });
                }

                if (
                    arg.type === 'TemplateLiteral' &&
                    arg.expressions &&
                    arg.expressions.length > 0
                ) {
                    context.report({ node, messageId: 'dynamicLiteralArgument' });
                }
            },
        };
    },
};
