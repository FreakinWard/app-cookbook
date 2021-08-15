const inquirer = require('inquirer')

const questions = [
    { type: 'confirm', name: 'option1', message: 'Want to nextJs?', default: false },
];

const prepare = ()=> {
    inquirer.prompt(questions);
}

module.exports ={
    name: 'nextjs',
    prepare
}