import inquirer from 'inquirer'

const questions = [
    { type: 'confirm', name: 'option1', message: 'Want to node?', default: false },
];


const prepare = async ()=> {
   const answers = await inquirer.prompt(questions);
    console.log({answers})
}

export default {
    name: 'node',
    prepare
}
