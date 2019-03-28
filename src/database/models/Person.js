export default class Person {
  static schema = {
    name: 'Person',
    primaryKey: 'id',
    properties: {
      id: 'int',
      firstName: 'string',
      lastName: 'string',
      jots: 'Jot[]',
      // picture: 'data?'
    },
  };

  constructor(firstName, lastName) {
    this.id = Number(String(Math.random()).slice(2));
    this.firstName = firstName;
    this.lastName = lastName;
  }
}
