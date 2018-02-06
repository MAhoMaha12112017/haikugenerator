const fs = require('fs');

var fetchHaikus = () => {
  try {
    var haikusString = fs.readFileSync('haiku.json');
    return JSON.parse(haikusString);
  } catch (e) {
    return [];
  }
};

var saveHaikus = (haikus) => {
    fs.writeFileSync('haiku.json', JSON.stringify(haikus));
};

var addHaiku = (clause, syllables) => {
  var haikus = fetchHaikus(syllables);
  var haiku = {
    clause,
    syllables
  };
  var duplicateHaikus = haikus.filter((haiku) => haiku.clause === clause);

  if (duplicateHaikus.length === 0) {
    haikus.push(haiku);
    saveHaikus(haikus);
    return haiku;
  }
};

var getAll = () => {
  return fetchHaikus();
};

var getHaiku = (clause) => {
  var haikus = fetchHaikus();
  var filteredHaikus = haikus.filter((haiku) => haiku.clause === clause);
  return filteredHaikus[0];
};

var removeHaiku = (clause) => {
  var haikus = fetchHaikus();
  var filteredHaikus = haikus.filter((haiku) => haiku.clause !== clause);
  saveHaikus(filteredHaikus);

  return haikus.length !== filteredHaikus.length;
};

var logHaiku = (haiku) => {
  console.log('--');
  console.log(`clause: ${haiku.clause}`);
  console.log(`Syllables: ${haiku.syllables}`);
};

module.exports = {
  addHaiku,
  getAll,
  getHaiku,
  removeHaiku,
  logHaiku
};
