import { getAuth } from "firebase/auth";

export class User {
  getMe = () => getAuth().currentUser;
}