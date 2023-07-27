import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export class Storage {
  async uploadFile(file, folder, fileName) {
    const storage = getStorage();
    const fileRef = ref(storage, `${folder}/${fileName}}`);
    return await uploadBytes(fileRef, file);
  }

  async getUrlFile(filePath) {
    const storage = getStorage();
    const fileRef = ref(storage, filePath);
    return await getDownloadURL(fileRef);
  }
}