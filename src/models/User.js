/**
 * User model
 */
class User {
  constructor(data = {}) {
    this.id = null;
    this.name = null;
    this.username = null;
    this.email = null;
    this.userToken = null;
    this.status = null;
    Object.assign(this, data);
  }
}

export default User;
