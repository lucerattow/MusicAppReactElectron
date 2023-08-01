import { setDoc, doc, collection, getDocs, getDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { map } from "lodash";
import { db } from "../utils";

export class Artist {
  constructor() {
    this.collectionName = "artists";
  }

  async create(imageUrl, name) {
    const id = uuidv4();
    const created_at = new Date();
    const data = {
      id,
      created_at,
      name,
      image: imageUrl,
    };

    const docRef = doc(db, this.collectionName, id);
    await setDoc(docRef, data);
  }

  async getAll() {
    const docRef = collection(db, this.collectionName);
    const snapshot = await getDocs(docRef);
    return map(snapshot.docs, (doc) => doc.data());
  }

  async getById(id) {
    const docRef = doc(db, this.collectionName, id);
    const snapshot = await getDoc(docRef);
    return snapshot.data();
  }
}