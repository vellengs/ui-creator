import fs from 'fs';
import path from 'path';
import commander from 'commander';

let {sep} = path;
let cwd = process.cwd();
let projectRootPath = cwd;


commander.usage('[command] <options ...>');

commander.option('-v, --version', 'output the version number', () => {
    console.log("Version ....");
});

commander.command('new <projectPath>').description('create project').action(projectPath => {

    projectRootPath = path.resolve(projectRootPath, projectPath);

    console.log(projectRootPath);
});

commander.parse(process.argv);