export class Helpers {
  static generateRandomUser() {
    const random = Math.random().toString(36).substring(2, 8);
    return {
      username: `user_${random}`,
      password: `Pass@${random}`
    };
  }
}
