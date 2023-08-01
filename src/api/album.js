import { setDoc, doc, collection, getDocs, getDoc, where, query } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { map } from "lodash";
import { db } from "../utils";

export class Album {
  constructor() {
    this.collectionName = "albums";
  }

  async create(name, imageUrl, artist) {
    const id = uuidv4();
    const created_at = new Date();
    const data = {
      id,
      created_at,
      name,
      artist,
      image: imageUrl,
    };

    const docRef = doc(db, this.collectionName, id);
    await setDoc(docRef, data);
  };

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

  async getByArtist(idArtist) {
    const whereRef = where("artist", "==", idArtist);
    const colleRef = collection(db, this.collectionName);
    const queryRef = query(colleRef, whereRef);

    const snapshot = await getDocs(queryRef);
    return map(snapshot.docs, (doc) => doc.data());
  }
}