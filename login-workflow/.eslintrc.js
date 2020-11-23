module.exports =  {
        parser:  '@typescript-eslint/parser',
        extends:  [ '@pxblue/eslint-config/ts' ],
        parserOptions:  {
            project: "./tsconfig.json",
        },
        env: {
            browser: true
        },
        rules: {
            'no-unused-expressions': 'off'
        }
    };
