import { db } from "./db";

const collectionName = 'problems';

export async function getProblems() {
  const querySnapshot = await getDocs(collection(collectionName, db));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function addProblem(problem) {
  const docRef = await addDoc(collection(db, collectionName), problem);
  return { id: docRef.id, ...problem };
}

export async function updateProblem(id, updatedData) {
  const docRef = doc(db, collectionName, id);
  await updateDoc(docRef, updatedData);
  return { id, ...updatedData };
}

export async function deleteProblem(id) {
  await deleteDoc(doc(db, collectionName, id));
}

export async function getProblembyid(id) {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
}
