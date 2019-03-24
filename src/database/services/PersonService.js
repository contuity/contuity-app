import realm from '../realm.js';
import Person from '../models/Person.js';

class PersonService {
  findAll() {
    // if (!sortBy) {
    //   sortBy = ['dateCreated', false];
    // }
    return realm.objects('Person').sorted('firstName');
  }

  save(person, newObj) {
    realm.write(() => {
      if (newObj) {
        for (let attr of Object.keys(newObj)) {
          person[attr] = newObj[attr];
        }
      }

      realm.create('Person', person, true);
    });
  }

  deleteJots(people) {
    realm.write(() => {
      realm.delete(people);
    });
  }
}

// Initialize the Singleton
let personServiceInstance = new PersonService();

// personServiceInstance.save(new Person('North', 'West'));

export default personServiceInstance;
