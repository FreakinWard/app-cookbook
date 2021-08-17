const inquirer = require('inquirer')
const ora = require('ora');
const shell = require("shelljs");


const questions = [
    { type: 'confirm', name: 'staticCodeAnalysis', message: 'Would you like to add static code analysis?', default: true },
];

const createApp = async (appName)=> {
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

const installPackages = async ()=> {
    const spinner = ora("Installing dependencies...").start();

    await new Promise(resolve => {
        shell.exec(`npm install`, () => {
            spinner.succeed();
            resolve();
        });
    });
}

const prepare = async (appName)=> {
    const recipeCard = await inquirer.prompt(questions);
    console.log({recipeCard})

    await createApp(appName)
    await installPackages();

    return true;
}

module.exports ={
    name: 'nextjs',
    prepare
}
