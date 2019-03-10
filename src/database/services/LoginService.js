import realm from '../realm.js';
import Realm from "realm";
import Jot from '../models/Jot.js';


const AUTH_URL = 'https://contuity-2.us1a.cloud.realm.io'


class LoginService {
  
  async login(email, password, createUser) {

    let creds = Realm.Sync.Credentials.usernamePassword(email, password, createUser) // createUser = true

    return Realm.Sync.User.login(AUTH_URL, creds)
  }
}



// Initialize the Singleton
let loginServiceInstance = new LoginService();

export default loginServiceInstance;
