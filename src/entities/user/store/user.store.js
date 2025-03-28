import { User } from "../model/user";

class UserStore {
  user;
  constructor() {
    this.user = null;
  }

  setUser(user) {
    this.user = user;
    localStorage.setItem("user", JSON.stringify(this.user.getProfile()));
  }

  updateUser(userData) {
    const user = User.build({ ...this.user.getProfile(), ...userData });
    this.user = user;
    localStorage.setItem("user", JSON.stringify(this.user.getProfile()));
  }

  getUser() {
    const storedUser = localStorage.getItem("user");
    if (storedUser && !this.user) {
      const userData = JSON.parse(storedUser);
      this.user = User.build(userData);
    }
    return this.user ?? null;
  }

  removeUser() {
    localStorage.removeItem("user");
    this.user = null;
  }

  getIsLogin() {
    return this.getUser() !== null;
  }
}

export const userStore = new UserStore();
