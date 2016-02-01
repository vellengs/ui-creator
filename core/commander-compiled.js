'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var sep = _path2['default'].sep;

var cwd = process.cwd();
var projectRootPath = cwd;

_commander2['default'].usage('[command] <options ...>');

_commander2['default'].option('-v, --version', 'output the version number', function () {
    console.log('Version ....');
});

_commander2['default'].command('new <projectPath>').description('create project').action(function (projectPath) {

    projectRootPath = _path2['default'].resolve(projectRootPath, projectPath);

    console.log(projectRootPath);
});

_commander2['default'].parse(process.argv);

//# sourceMappingURL=commander-compiled.js.map