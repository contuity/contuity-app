import Realm from 'realm';
import Jot from './models/Jot';
import Person from './models/Person';

const databaseOptions = {
  path: 'contuity.realm',
  schema: [Jot.schema, Person.schema],
  schemaVersion: 0,
};

export default new Realm(databaseOptions);
