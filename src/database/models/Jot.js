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
      people: {
        type: 'linkingObjects',
        objectType: 'Person',
        property: 'jots',
      },
    },
  };

  constructor(title, content) {
    this.id = Number(String(Math.random()).slice(2));
    this.title = title;
    this.content = content;
    this.dateCreated = new Date();
    this.dateModified = new Date();
  }
}
