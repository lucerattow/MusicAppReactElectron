import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword
} from 'firebase/auth';

export class Auth {
  async register(email, password) {
    const auth = getAuth();
    await createUserWithEmailAndPassword(auth, email, password);
  }

  async login(email, password) {
    const auth = getAuth();
    await signInWithEmailAndPassword(auth, email, password);
  }

  async logout() {
    const auth = getAuth();
    await signOut(auth);
  }
}