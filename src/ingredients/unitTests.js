module.exports  = {
    name: "unitTests",
    question: "Would you like unit tests?",
    dependencies: [],
    devDependencies: [
        "@testing-library/jest-dom",
        "jest",
        "eslint-plugin-jest"
    ],
    packageEntries: [
        {
            key: "scripts.test",
            value: "jest"
        },
        {
            key: "scripts.test:cover",
            value: "jest --coverage"
        },
    ],
    templates: []
};
