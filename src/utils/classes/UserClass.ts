import EventEmitter from "events";
import { GivenUser } from "../types/user";

export class SelfUserClass extends EventEmitter {
  static instance: SelfUserClass;
  static getInstance() {
    if (!SelfUserClass.instance) {
      SelfUserClass.instance = new SelfUserClass();
    }
    return SelfUserClass.instance;
  }
  private constructor() {
    super();
  }
  private _user: GivenUser | null = null;
  get user() {
    return this._user;
  }
  set user(user: GivenUser | null) {
    this._user = user;
    this.emit("change", user);
  }
}
