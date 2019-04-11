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

  removePersonFromJot(person, jot) {
    person.jots.forEach((item, index) => {
      if (item.id === jot.id) {
        realm.write(() => {
          realm.create(
            'Person',
            { id: person.id, jots: person.jots.splice(index, index) },
            true
          );
        });
      }
    });
  }
}

// Initialize the Singleton
let personServiceInstance = new PersonService();

export default personServiceInstance;
