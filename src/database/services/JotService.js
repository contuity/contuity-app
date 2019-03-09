import realm from '../realm.js';
import Jot from '../models/Jot.js';

let JotService = {
  findAll: function(sortBy) {
    if (!sortBy) {
      sortBy = ['dateCreated', false];
    }
    return realm.objects('Jot');
  },

  save: function(jot) {
    let existingJot = realm.objects('Jot').filtered('id = ' + jot.id);

    if (existingJot.length) {
      return;
    }

    realm.write(() => {
      realm.create('Jot', jot);
    });
  },

  update: function(jot, newObj) {
    realm.write(() => {
      jot.dateModified = new Date();

      if (newObj) {
        for (let attr of Object.keys(newObj)){
          jot[attr] = newObj[attr]
        }
      }


      realm.create('Jot', jot, true);
    });
  },
};

// populate Jot table
JotService.save(new Jot('Jot 1', 'This is my first jot.'));
JotService.save(new Jot('Jot 2', 'This is my second jot.'));
JotService.save(new Jot('Jot 3', 'This is my third jot.'));

export default JotService;
