import Realm from 'realm';
import Jot from './models/Jot';

const databaseOptions = {
  path: 'contuity.realm',
  schema: [Jot.schema],
  schemaVersion: 0,
};

export default new Realm(databaseOptions);
