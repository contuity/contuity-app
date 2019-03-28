import realm from '../realm.js';

class JotService {
  findAll(sortBy) {
    if (!sortBy) {
      sortBy = ['dateCreated', false];
    }
    return realm.objects('Jot');
  }

  findAllCreatedToday() {
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
  }

  findAllCreatedThisWeek() {
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
  }

  // If a jot with this Jot's ID already exists, this will override the existing data in the DB
  // if a jot does not exist, this will create the jot from scratch
  // if newObj is given its properties will be copied to jot.
  save(jot, newObj) {
    realm.write(() => {
      jot.dateModified = new Date();

      if (newObj) {
        for (let attr of Object.keys(newObj)) {
          jot[attr] = newObj[attr];
        }
      }

      realm.create('Jot', jot, true);
    });
  }

  deleteJots(jots) {
    realm.write(() => {
      realm.delete(jots);
    });
  }
}

// Initialize the Singleton
let jotServiceInstance = new JotService();

export default jotServiceInstance;
