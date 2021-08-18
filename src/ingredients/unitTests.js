import jestSetup from '../ingredients/templates/jestSetup'
import jestConfig from '../ingredients/templates/jestConfig'

export default {
    name: "unitTests",
    question: "Would you like unit tests?",
    dependencies: [],
    devDependencies: [
        "@testing-library/jest-dom",
        "jest",
        "jest-junit",
        "jest-html-reporters",
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
    templates: [
        {
            targetPath: 'jest.config.js',
            file: jestConfig
        },
        {
            targetPath: 'jest.setup.js',
            file: jestSetup
        }
    ]
};
