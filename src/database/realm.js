import Realm from 'realm';
import Jot from './models/Jot';

export default new Realm({ schema: [Jot] });
