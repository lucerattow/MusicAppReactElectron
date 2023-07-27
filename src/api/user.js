import { getAuth, updateProfile, EmailAuthProvider, reauthenticateWithCredential, updateEmail, updatePassword } from "firebase/auth";
import { update } from "immutable";

export class User {
  getMe() {
    return getAuth().currentUser;
  }

  async updateAvatar(url) {
    const auth = getAuth();
    await updateProfile(auth.currentUser, {
      photoURL: url,
    });
  }

  async updateDisplayName(displayName) {
    const auth = getAuth();
    await updateProfile(auth.currentUser, {
      displayName: displayName,
    });
  }

  async updateEmail(newEmail, password) {
    const { currentUser } = getAuth();
    const email = currentUser.email;

    const credentials = EmailAuthProvider.credential(email, password);
    await reauthenticateWithCredential(currentUser, credentials);
    await updateEmail(currentUser, newEmail);
  }

  async updatePassword(password, newPassword) {
    const { currentUser } = getAuth();
    const email = currentUser.email;

    const credentials = EmailAuthProvider.credential(email, password);
    await reauthenticateWithCredential(currentUser, credentials);
    await updatePassword(currentUser, newPassword);
  }
}