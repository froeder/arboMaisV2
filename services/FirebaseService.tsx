//Firebase configuration
import "firebase/firestore";
import {
  collection,
  onSnapshot,
  doc,
  setDoc,
  getFirestore,
  orderBy,
  query,
  where,
  getDocs,
  getDoc,
} from "firebase/firestore";
import * as fa from "firebase/auth";

fa.getAuth().languageCode = "pt";

const db = getFirestore();

export async function getCollections(database) {
  try {
    const q = query(collection(db, database), orderBy("titulo"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => doc.data());
  } catch (error) {
    console.log(error);
  }
}
