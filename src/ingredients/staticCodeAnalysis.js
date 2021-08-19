import eslintrc from './templates/eslintrc'
import prettier from './templates/prettier';

export default {
    name: "staticCodeAnalysis",
    question: "Would you like static code analysis?",
    dependencies: [],
    devDependencies: [
        "eslint",
        "eslint-config-react-goodies",
        "eslint-plugin-prettier",
        "eslint-config-prettier",
        "eslint-plugin-simple-import-sort",
        "@typescript-eslint/eslint-plugin",
        "@typescript-eslint/parser",
        "@typescript-eslint/eslint-plugin",
        "@typescript-eslint/parser",
        "pre-commit",
        "prettier",
        "typescript"
    ],
    packageEntries: [
        {
            key: "pre-commit",
            value: ["format:fix", "lint:fix"]
        },
        {
            key: "scripts.lint",
            value: "eslint . -f table"
        },
        {
            key: "scripts.lint:fix",
            value: "npm run lint -- --fix"
        },
        {
            key: "scripts.format",
            value: "prettier './**/*.{js,jsx,ts,tsx,css,md,json} --config prettier.config.js"
        },
        {
            key: "scripts.format:fix",
            value: "npm run format -- --write"
        },
    ],
    templates: [
        {
            targetPath: '.eslintrc.js',
            file: eslintrc
        },
        {
            targetPath: 'prettier.config.js',
            file: prettier
        }
    ]
};
