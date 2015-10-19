var Spooky = require('spooky'),
    _ = require('underscore');

function setup(context, done) {
    var spooky = context.spooky = new Spooky(context.config, function(err) {
        if(err) {
            var e = new Error('Failed to initialize Spooky.js');
            e.details = err || error;
            throw e;
        }

        spooky.debug = true;

        spooky.fails = [];
        spooky.on('error', function(e) { console.error(e);});
        spooky.on('console', function(line) {
            console.log(line);

            if(line.match(/FAIL/)){
                spooky.fails.push(line);
                return;
            }
        });
        spooky.on('log', function(log) {
            if(log.space === 'remote') {
                console.log(log.message.replace(/ \- .*/, ''));
            }
        });
        done();spookyMochaTest.js
    });
}

module.exports.before = function(context) {
    context.config = _.defaults(context.config || {}, {
        casper: {
                    verbose: true,
                    logLevel: 'debug'
                }
    });

    return function(done) {
        setup(context, done);
    }
}

module.exports.after = function(context) {
    return function(done) {
        context.spooky.removeAllListeners();
        context.spooky.destroy();
        done();
    };
}
