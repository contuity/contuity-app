import realm from '../realm.js';
import Jot from '../models/Jot.js';


class JotService {
  findAll(sortBy) {
    if (!sortBy) {
      sortBy = ['dateCreated', false];
    }

    // TODO: use the sortBy variable
    return realm.objects('Jot');
  }


  // save: function(jot) {
  //   let existingJot = realm.objects('Jot').filtered('id = ' + jot.id);

  //   if (existingJot.length) {
  //     return;
  //   }

  //   realm.write(() => {
  //     realm.create('Jot', jot);
  //   });
  // },


  // If a jot with this Jot's ID already exists, this will override the existing data in the DB
  // if a jot does not exist, this will create the jot from scratch
  // If jot is given, newObj can also be givin which are properties that will be copied to jot.
  update(jot, newObj) {
    realm.write(() => {
      jot.dateModified = new Date();

      if (newObj) {
        for (let attr of Object.keys(newObj)){
          jot[attr] = newObj[attr]
        }
      }

      console.log(jot.id)


      realm.create('Jot', jot, true);
    });
  }
}



// Initialize the Singleton
let jotServiceInstance = new JotService();

// populate Jot table
jotServiceInstance.update(new Jot('Jot 1', 'This is my first jot.'));
jotServiceInstance.update(new Jot('Jot 2', 'This is my second jot.'));
jotServiceInstance.update(new Jot('Jot 3', 'This is my third jot.'));

export default jotServiceInstance;
