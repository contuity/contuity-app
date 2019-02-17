import Realm from 'realm';

export default class Jot extends Realm.Object {}

Jot.schema = {
  name: 'Jot',
  primaryKey: 'id', // auto-incremented
  properties: {
    id: 'int',
    title: 'string?',
    content: 'string',
    dateCreated: 'date',
    dateModified: 'date',
    reminder: 'date?',
    // space
    // person
  },
};
