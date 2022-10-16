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
