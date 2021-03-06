import inquirer from 'inquirer';
import recipes from './recipes'

export default function app() {
    const choices = recipes.map(config => config.name);

    const questions = [
        {
            name: 'appName',
            message: 'Enter a name for the new app (my-app-name)',
            type: 'input',
            validate: name=> name === '' ? 'Required' : true
        },
        {
            name: 'recipe',
            message: 'Choose an app recipe to prepare',
            type: 'list',
            choices,
        },
    ];

    inquirer
    .prompt(questions)
    .then(answers=> {
        const recipe = recipes.find(config => config.name===answers.recipe)
        recipe.prepare(answers.appName)
    });
}
