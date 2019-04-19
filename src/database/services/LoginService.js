import Realm from 'realm';

const AUTH_URL = 'https://contuity-2.us1a.cloud.realm.io';

class LoginService {
  async login(email, password, createUser) {
    let creds = Realm.Sync.Credentials.usernamePassword(
      email,
      password,
      createUser
    ); // createUser = true

    return Realm.Sync.User.login(AUTH_URL, creds);
  }
}

// Export a Singleton
export default new LoginService();
