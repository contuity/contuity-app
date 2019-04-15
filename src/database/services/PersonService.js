import realm from '../realm.js';

class PersonService {
  findAll(sortBy, desc) {
    let sortPeopleBy = sortBy;
    let descending = desc;

    if (!sortPeopleBy) {
      sortPeopleBy = 'firstName';
      descending = false;
    }

    return realm.objects('Person').sorted(sortPeopleBy, descending);
  }

  findPeopleBySearchTerm(searchTerm) {
    let people = this.findAll();
    return people.filtered(
      'firstName CONTAINS[c] $0 OR lastName CONTAINS[c] $0',
      searchTerm
    );
  }

  findPeopleWithMostJots(numResults) {
    let people = this.findAll().slice();

    people.sort((a, b) => {
      return b.jots.length - a.jots.length;
    });

    return people.slice(0, numResults);
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
