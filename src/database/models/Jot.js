import Realm from 'realm';

export default class Jot {
  static schema = {
    name: 'Jot',
    primaryKey: 'id',
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

  constructor(id, title, content) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.dateCreated = new Date();
    this.dateModified = new Date();
  }
}
