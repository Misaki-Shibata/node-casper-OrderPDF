// var Spooky = require('spooky');
// var spooky = new Spooky({
//   casper: {
//     //configure casperjs here
//   }
// }, function (err) {
//   // NODE CONTEXT
//   console.log('We are in the Node context');
//   spooky.start('http://google.co.jp/');
//   spooky.then(function() {
//     // CASPERJS CONTEXT
//     console.log('We are in the CasperJS context');
//     this.emit('console', 'We can also emit events here.');
//     this.click('a#somelink');
//   });
//   spooky.then(function() {
//     // CASPERJS CONTEXT
//     var size = this.evaluate(function() {
//     // PAGE CONTEXT
//     console.log('....'); // DOES NOT GET PRINTED OUT
//     // __utils__.echo('We are in the Page context'); // Gets printed out
//     this.capture('screenshot.png');
//     var $selectsize = $('select#myselectlist option').size();
//       return $selectsize;
//     });
//   });
// });
try {
    var Spooky = require('spooky');
} catch (e) {
    var Spooky = require('../lib/spooky');
}

var spooky = new Spooky({
        child: {
            transport: 'http'
        },
        casper: {
            logLevel: 'debug',
            verbose: true
        }
    }, function (err) {
        if (err) {
            e = new Error('Failed to initialize SpookyJS');
            e.details = err;
            throw e;
        }

        spooky.start(
            'http://en.wikipedia.org/wiki/Spooky_the_Tuff_Little_Ghost');
        spooky.then(function () {
            this.emit('hello', 'Hello, from ' + this.evaluate(function () {
                return document.title;
            }));
        });
        spooky.run();
    });

spooky.on('error', function (e, stack) {
    console.error(e);

    if (stack) {
        console.log(stack);
    }
});

/*
// Uncomment this block to see all of the things Casper has to say.
// There are a lot.
// He has opinions.
spooky.on('console', function (line) {
    console.log(line);
});
*/

spooky.on('hello', function (greeting) {
    console.log(greeting);
});

spooky.on('log', function (log) {
    if (log.space === 'remote') {
        console.log(log.message.replace(/ \- .*/, ''));
    }
});
