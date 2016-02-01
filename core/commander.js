import path from 'path';
import commander from 'commander';

import fs from 'fs-extra';

let {sep} = path;
let cwd = process.cwd();
let projectRootPath = cwd;


commander.usage('[command] <options ...>');

commander.option('-v, --version', 'output the version number', () => {
    console.log("Version ....");
});

commander.command('new <projectPath>').description('create project').action(projectPath => {

    projectRootPath = path.resolve(projectRootPath, projectPath);

    fs.copy('./../www', projectRootPath, (err) => {
        if (err) return console.error(err);
        console.log('success!')
    });
});

commander.parse(process.argv);