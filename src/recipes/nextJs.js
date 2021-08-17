const inquirer = require('inquirer')
const ora = require('ora');
const shell = require("shelljs");
const fse = require("fs-extra");
const staticCodeAnalysis = require('../ingredients/staticCodeAnalysis')
const unitTests = require('../ingredients/unitTests')
const set = require("lodash.set");

const availableIngredients = [staticCodeAnalysis, unitTests]

const ingredientQuestions = availableIngredients.map(i=> {
    return {
        type: 'confirm',
        name: i.name,
        message: i.question,
        default: true
    }
});

const buildIngredients = async ()=> {
    const ingredientAnswers = await inquirer.prompt(ingredientQuestions);

    const ingredientNames = Object.entries(ingredientAnswers).map(([key, value]) => value ? key : null);
    const requestedIngredientList = availableIngredients.filter(x=> ingredientNames.includes(x.name));

    return requestedIngredientList
}

const createApp = async appName => {
    const action = 'create-next-app'
    const spinner = ora(`Running ${action}...`).start();

    return new Promise((resolve, reject) => {
        shell.exec(
            `npx ${action} ${appName} --use-npm`,
            () => {
                const cdRes = shell.cd(appName);

                if (cdRes.code !== 0) {
                    console.log(`Error changing directory to: ${appName}`.red);
                    reject();
                }

                spinner.succeed();
                resolve();
            }
        );
    });
}

const addPackages = ingredientList => {
    const fileName = "package.json";

    const spinner = ora(`Adding the ${fileName} packages...`);

    let packageEntries = ingredientList.reduce(
        (acc, val) => [...acc, ...val.packageEntries],
        []
    );

    return new Promise(resolve => {
        const packageFile = fse.readFileSync(fileName);
        const packageJson = JSON.parse(packageFile);

        packageEntries.forEach(script => {
            set(packageJson, script.key, script.value);
        });

        const formattedJson = JSON.stringify(packageJson, null, 2);

        fse.writeFile(fileName, formattedJson, ( err ) => {
            if (err) {
                spinner.fail();
                return console.log(err);
            }

            spinner.succeed();
            resolve();
        });
    });
};

const installPackages = async (requestedIngredientList)=> {
    let dependencies = [];
    let devDependencies = [];

    requestedIngredientList.forEach(ingredient => {
        dependencies = [...dependencies, ...ingredient.dependencies];
        devDependencies = [...devDependencies, ...ingredient.devDependencies];
    });

    await new Promise(resolve => {
        const spinner = ora("Installing dependencies...").start();

        shell.exec(`npm install --save ${dependencies.join(" ")}`, () => {
            spinner.succeed();
            resolve();
        });
    });

    await new Promise(resolve => {
        const spinner = ora("Installing devDependencies...").start();

        shell.exec(`npm install --save ${devDependencies.join(" ")}`, () => {
            spinner.succeed();
            resolve();
        });
    });
}

const commitGit = () => {
    const spinner = ora("Committing files to Git...");

    return new Promise(resolve => {
        shell.exec(
            'git add . && git commit --no-verify -m "initial commit"',
            () => {
                spinner.succeed();
                resolve();
            }
        );
    });
};

const prepare = async (appName)=> {
    const requestedIngredientList = await buildIngredients()

    await createApp(appName)
    await addPackages(requestedIngredientList)
    await installPackages(requestedIngredientList);
    await commitGit();

    return true;
}

module.exports ={
    name: 'nextjs',
    prepare
}
