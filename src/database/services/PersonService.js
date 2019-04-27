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
      'firstName BEGINSWITH[c] $0 OR lastName BEGINSWITH[c] $0',
      searchTerm
    );
  }

  findPeopleWithMostJots(numPeople) {
    let people = this.findAll().slice();

    people.sort((a, b) => {
      return b.jots.length - a.jots.length;
    });

    return people.slice(0, numPeople);
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

  getInitials(firstName, lastName) {
    let initials = '';
    if (firstName) {
      initials += firstName[0];
    }
    if (lastName) {
      initials += lastName[0];
    }
    return initials;
  }
}

// Initialize the Singleton
let personServiceInstance = new PersonService();

export default personServiceInstance;
