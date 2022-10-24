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
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import * as fa from "firebase/auth";

fa.getAuth().languageCode = "pt";

const db = getFirestore();
const storage = getStorage();

export async function getCollection(collectionName: string) {
  const q = query(
    collection(db, collectionName),
    orderBy("numero"),
    where("ativo", "==", "S")
  );
  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map((doc) => doc.data());
  return data;
}
export async function getPhoto(id, arvore) {
  try {
    const storageRef = ref(storage, `${id}/${arvore}.jpeg`);
    const url = await getDownloadURL(storageRef);
    return url;
  } catch (error) {}
}
