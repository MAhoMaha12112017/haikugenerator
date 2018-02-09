const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const haikus = require('./haiku.js');

const argv = yargs.argv;
var command = argv._[0];
// console.log('Command: ', command);
// console.log('Yargs', argv);

if (command === 'add') {
  if (argv.clause === undefined || argv.syllables === undefined) {
    return console.log('Please give both clause and number of syllables!');
  }
  var haiku = haikus.addHaiku(argv.clause, argv.syllables);
  if (haiku) {
    console.log(`Clause of ${argv.syllables} syllables created`);
    haikus.logHaiku(haiku);
  } else {
    console.log('Haiku clause already added');
  }
} else if (command === 'list') {
  var fetchedHaikus = haikus.getAll();
  fetchedHaikus.forEach((haiku) => haikus.logHaiku(haiku));
} else if (command === 'read') {
  var haiku = haikus.getHaiku(argv.clause);
  if (haiku) {
    console.log('clause found');
    haikus.logHaiku(haiku);
  } else {
    console.log('clause not found');
  }
} else if (command === 'remove') {
  var haikuRemoved = haikus.removeHaiku(argv.clause);
  var message = haikuRemoved ? 'clause was removed' : 'clause not found';
  console.log(message); 
} else if (command === 'random') {
  var clause = haikus.getRandom(argv.syllables);
  if (clause === undefined) {
    return console.log(`Clause with ${argv.syllables} syllables cannot be found`);
  }
  console.log(clause.clause);
  //haikus.logHaiku(clause);
} else if (command === 'haiku') {
  var haiku = haikus.getHaiku();
  console.log(haiku);
} else {
  console.log('Command not recognized');
}
