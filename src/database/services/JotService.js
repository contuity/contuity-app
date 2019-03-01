import realm from '../realm.js';
import Jot from '../models/Jot.js';

let JotService = {
  findAll: function(sortBy) {
    if (!sortBy) {
      sortBy = ['dateCreated', false];
    }
    return realm.objects('Jot');
  },

  findAllCreatedToday: function() {
    let dayStart = new Date();
    dayStart.setHours(0, 0, 0);
    let dayEnd = new Date();
    dayEnd.setHours(23, 59, 59);

    let allJots = realm.objects('Jot');
    return allJots.filtered(
      'dateCreated >= $0 && dateCreated < $1',
      dayStart,
      dayEnd
    );
  },

  findAllCreatedThisWeek: function() {
    let dayStart = new Date();
    dayStart.setDate(dayStart.getDate() - 7);
    let dayEnd = new Date();
    dayEnd.setHours(-1, 59, 59);

    let allJots = realm.objects('Jot');
    return allJots.filtered(
      'dateCreated >= $0 && dateCreated < $1',
      dayStart,
      dayEnd
    );
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

  update: function(jot) {
    realm.write(() => {
      jot.dateModified = new Date();
      realm.create('Jot', jot, true);
    });
  },
};

// populate Jot table
JotService.save(new Jot(1, 'Jot 1', 'This is my first jot.'));
JotService.save(new Jot(2, 'Jot 2', 'This is my second jot.'));
JotService.save(new Jot(3, 'Jot 3', 'This is my third jot.'));
JotService.save(new Jot(4, 'Jot 4', 'This is my fourth jot.'));
JotService.save(new Jot(5, 'Jot 5', 'This is my five jot.'));

export default JotService;
