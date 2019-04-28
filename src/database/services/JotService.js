import realm from '../realm.js';
import moment from 'moment';

class JotService {
  findAll() {
    return realm.objects('Jot').sorted('dateCreated', false);
  }

  findById(jotId) {
    return realm.objectForPrimaryKey('Jot', jotId);
  }

  findAllCreatedToday() {
    let dayStart = moment()
      .startOf('day')
      .toDate();

    let dayEnd = moment()
      .endOf('day')
      .toDate();

    let allJots = realm.objects('Jot');
    return allJots
      .filtered('dateCreated >= $0 && dateCreated <= $1', dayStart, dayEnd)
      .sorted('dateCreated', true);
  }

  findAllCreatedYesterday() {
    let yesterday = moment().subtract(1, 'days');
    let dayStart = yesterday.startOf('day').toDate();
    let dayEnd = yesterday.endOf('day').toDate();

    let allJots = realm.objects('Jot');
    return allJots
      .filtered('dateCreated >= $0 && dateCreated <= $1', dayStart, dayEnd)
      .sorted('dateCreated', true);
  }

  findAllCreatedThisWeek() {
    let dayStart = moment()
      .subtract(7, 'days')
      .startOf('day')
      .toDate();
    let dayEnd = moment()
      .subtract(2, 'days') // day before yesterday
      .endOf('day')
      .toDate();

    let allJots = realm.objects('Jot');
    return allJots
      .filtered('dateCreated >= $0 && dateCreated <= $1', dayStart, dayEnd)
      .sorted('dateCreated', true);
  }

  findAllOtherJots() {
    let dayStart = moment()
      .subtract(7, 'days')
      .startOf('day')
      .toDate();

    let allJots = realm.objects('Jot');
    return allJots
      .filtered('dateCreated < $0', dayStart)
      .sorted('dateCreated', true);
  }

  // if a jot with this Jot's ID already exists, this will override the existing data in the DB
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
