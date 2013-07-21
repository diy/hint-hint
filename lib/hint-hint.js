var jshint  = require('jshint').JSHINT;
var glob    = require('glob');
var fs      = require('fs');
var async   = require('async');

module.exports = function (path, config) {
    var colours = function (string, colour) {
        var colours = {
            red: '\033[31m',
            yellow: '\033[33m'
        };
        return colours[colour] + string + '\033[0;39m';
    };

    glob(path, function (err, files) {
        if (err) return err;

        var tests = 0;
        async.each(files, function (file, callback) {
            var test   = jshint(fs.readFileSync(file, 'utf-8'), config);
            var errors = jshint.data().errors;

            tests++;
            process.stdout.write(test ? 'ok ' : 'not ok ');
            process.stdout.write(tests + ' - ' + file + ' \n');

            if (errors) {
                process.stderr.write('# Failed JSHint: ' + colours(file, 'yellow') + '\n#\n');

                for (var i = 0; i < errors.length; i++) {
                    var line = errors[i];

                    var message = '# ' + colours(line.reason, 'red') +
                        colours(' At line ' + line.line + ':', 'yellow') + '\n#\n' +
                        '# ' + line.evidence + '\n#';
                    for (var j = 0; j < line.character; j++) {
                        message += ' ';
                    }
                    message += '^\n#\n';

                    process.stderr.write(message);
                }
            }

            callback();
        }, function (err) {
            if (err) return err;
            process.stdout.write('1..' + tests + '\n');
        });
    });

};