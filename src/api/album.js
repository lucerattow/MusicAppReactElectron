import {
  doc,
  setDoc,
  collection,
  getDoc,
  getDocs,
  where,
  query,
  limit,
  orderBy
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
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

  async getById(id) {
    const docRef = doc(db, this.collectionName, id);
    const snapshot = await getDoc(docRef);
    return snapshot.data();
  }

  async getAll() {
    const colleRef = collection(db, this.collectionName);
    const ordByRef = orderBy("created_at", "desc");
    const queryRef = query(colleRef, ordByRef);

    const snapshot = await getDocs(queryRef);
    return _.map(snapshot.docs, (doc) => doc.data());
  }

  async getByArtist(idArtist) {
    const colleRef = collection(db, this.collectionName);
    const whereRef = where("artist", "==", idArtist);
    const ordByRef = orderBy("created_at", "desc");
    const queryRef = query(colleRef, whereRef, ordByRef);

    const snapshot = await getDocs(queryRef);
    return _.map(snapshot.docs, (doc) => doc.data());
  }

  async getLastAdded(itemsLimit = 20) {
    const colleRef = collection(db, this.collectionName);
    const ordByRef = orderBy("created_at", "desc");
    const limitRef = limit(itemsLimit);
    const queryRef = query(colleRef, ordByRef, limitRef);

    const snapshot = await getDocs(queryRef);
    return _.map(snapshot.docs, (doc) => doc.data());
  }
}