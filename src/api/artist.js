import { map } from "lodash";
import { setDoc, doc, collection, getDocs, getDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { db } from "../utils";

export class Artist {
  constructor() {
    this.collectionName = "artists";
  }

  async create(image, name) {
    const idArtist = uuidv4();
    const created_at = new Date();
    const data = { id: idArtist, image, name, created_at };

    const docRef = doc(db, this.collectionName, idArtist);
    await setDoc(docRef, data);
  }

  async getAll() {
    const docRef = collection(db, this.collectionName);
    const snapshot = await getDocs(docRef);
    return map(snapshot.docs, (doc) => doc.data());
  }

  async getArtist(id) {
    const docRef = doc(db, this.collectionName, id);
    const snapshot = await getDoc(docRef);
    return snapshot.data();
  }
}