// console.log('Starting app.js');

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const haikus = require('./haiku.js');

const argv = yargs.argv;
var command = argv._[0];
// console.log('Command: ', command);
// console.log('Yargs', argv);

if (command === 'add') {
  var haiku = haikus.addHaiku(argv.clause, argv.syllables);
  if (haiku) {
    console.log(`Haikurow of ${argv.syllables} syllables created`);
    haikus.logHaiku(haiku);
  } else {
    console.log('Haiku clause taken');
  }
} else if (command === 'list') {
  var fetchedHaikus = haikus.getAll();
  fetchedHaikus.forEach((haiku) => haikus.logHaiku(haiku));
} else if (command === 'read') {
  var haiku = haikus.getHaiku(argv.clause);
  if (haiku) {
    console.log('haiku found');
    haikus.logHaiku(haiku);
  } else {
    console.log('haiku not found');
  }
} else if (command === 'remove') {
  var haikuRemoved = haikus.removeHaiku(argv.clause);
  var message = haikuRemoved ? 'haiku was removed' : 'haiku not found';
  console.log(message);
} else {
  console.log('Command not recognized');
}
