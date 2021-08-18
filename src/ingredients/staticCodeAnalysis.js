export default {
    name: "staticCodeAnalysis",
    question: "Would you like static code analysis?",
    dependencies: [],
    devDependencies: [
        "eslint",
        "pre-commit",
        "prettier"
    ],
    packageEntries: [
        {
            key: "pre-commit",
            value: ["format:check"]
        },
        {
            key: "scripts.lint",
            value: "eslint . -f table"
        },
        {
            key: "scripts.lint:fix",
            value: "eslint --fix . -f table"
        },
        {
            key: "scripts.format",
            value: "prettier --write './**/*.{js,jsx,ts,tsx,css,md,json}"
        },
        {
            key: "scripts.format:fix",
            value: "prettier --list-different src/**/*.{js,ts,tsx,scss}"
        },
    ],
    templates: []
};
