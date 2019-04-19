import realm from '../realm.js';

class JotService {
  findAll() {
    return realm.objects('Jot').sorted('dateCreated', false);
  }

  findById(jotId) {
    return realm.objectForPrimaryKey('Jot', jotId);
  }

  findAllCreatedToday() {
    let dayStart = new Date();
    dayStart.setHours(0, 0, 0);
    let dayEnd = new Date();
    dayEnd.setHours(23, 59, 59);

    let allJots = realm.objects('Jot');
    return allJots
      .filtered('dateCreated >= $0 && dateCreated <= $1', dayStart, dayEnd)
      .sorted('dateCreated', true);
  }

  findAllCreatedYesterday() {
    let dayStart = new Date();
    dayStart.setHours(0, 0, 0);
    dayStart.setDate(dayStart.getDate() - 1);
    let dayEnd = new Date();
    dayEnd.setHours(23, 59, 59);
    dayEnd.setDate(dayEnd.getDate() - 1);

    let allJots = realm.objects('Jot');
    return allJots
      .filtered('dateCreated >= $0 && dateCreated <= $1', dayStart, dayEnd)
      .sorted('dateCreated', true);
  }

  findAllCreatedThisWeek() {
    let dayStart = new Date();
    dayStart.setHours(0, 0, 0);
    dayStart.setDate(dayStart.getDate() - 7);
    let dayEnd = new Date();
    dayEnd.setHours(23, 59, 59);
    dayEnd.setDate(dayEnd.getDate() - 2);

    let allJots = realm.objects('Jot');
    return allJots
      .filtered('dateCreated >= $0 && dateCreated <= $1', dayStart, dayEnd)
      .sorted('dateCreated', true);
  }

  findAllOtherJots() {
    let dayStart = new Date();
    dayStart.setHours(0, 0, 0);
    dayStart.setDate(dayStart.getDate() - 7);

    let allJots = realm.objects('Jot');
    return allJots
      .filtered('dateCreated < $0', dayStart)
      .sorted('dateCreated', true);
  }

  // If a jot with this Jot's ID already exists, this will override the existing data in the DB
  // if a jot does not exist, this will create the jot from scratch
  // if newObj is given its properties will be copied to jot.
  save(jot, newObj) {
    let newJot;
    realm.write(() => {
      jot.dateModified = new Date();

      if (newObj) {
        for (let attr of Object.keys(newObj)) {
          jot[attr] = newObj[attr];
        }
      }

      newJot = realm.create('Jot', jot, true);
    });

    return newJot;
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
