import realm from '../realm.js';

class PersonService {
  findAll() {
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

  deletePeople(people) {
    realm.write(() => {
      realm.delete(people);
    });
  }
}

// Initialize the Singleton
let personServiceInstance = new PersonService();

// personServiceInstance.deletePeople(realm.objects('Person'));
// personServiceInstance.save(new Person('North', 'West'));

export default personServiceInstance;
