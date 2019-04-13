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
    let newJots = person.jots.filter(j => j.id !== jot.id);
    this.save(person, { jots: newJots });
  }
}

// Initialize the Singleton
let personServiceInstance = new PersonService();

export default personServiceInstance;
