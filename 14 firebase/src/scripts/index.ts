import { initializeApp } from 'firebase/app';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  orderBy,
  query,
  setDoc,
} from 'firebase/firestore';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import '../assets/scss/index.scss';
import { firebaseConfig } from './firebase-config';

const buttonAdd = document.querySelector('.add') as HTMLButtonElement;
const buttonDel = document.querySelector('.delete') as HTMLButtonElement;
const buttonAlter = document.querySelector('.alter') as HTMLButtonElement;
const buttonFile = document.querySelector('.file') as HTMLButtonElement;

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const aula1Collecction = collection(db, 'aula1');
const storage = getStorage();
// const storageRef = ref(storage);

async function init() {
  const q = query(aula1Collecction, orderBy('nome'));
  const querySnapshot = await getDocs(q);
  console.log('querySnapshot', querySnapshot);
  const div = document.querySelector('.usuarios') as HTMLDivElement;
  div.innerHTML = '';
  querySnapshot.forEach(doc => {
    console.log(`${doc.id} => ${doc.data().nome}`);
    const p = document.createElement('p');
    p.innerText = doc.data().nome;
    div.appendChild(p);
  });
}
init();

buttonAdd.addEventListener('click', async () => {
  await addDoc(aula1Collecction, {
    nome: 'Tokyo',
    idade: 50,
  });
  init();
});

buttonDel.addEventListener('click', async () => {
  await deleteDoc(doc(db, 'aula1', 'LA2'));
  init();
});

buttonAlter.addEventListener('click', async () => {
  await setDoc(doc(db, 'aula1', 'YlpgqKsG5fdC06Sz7iPs'), {
    nome: 'Tokyo',
    idade: 100,
  });
  init();
});

buttonFile.addEventListener('click', async () => {
  const storageRef = ref(storage, 'imagem/imagem-teste.jpg');
  const input = document.querySelector('input') as HTMLInputElement;
  const file = input.files[0];
  const snapshot = await uploadBytes(storageRef, file);
  console.log('Uploaded a blob or file!');
});
