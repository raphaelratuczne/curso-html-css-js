import { initializeApp } from 'firebase/app';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import '../assets/scss/index.scss';
import { firebaseConfig } from './firebase-config';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// console.log('app', app);

async function init() {
  const _collection = collection(db, 'aula1');
  const querySnapshot = await getDocs(_collection);
  // console.log('querySnapshot', querySnapshot);
  const div = document.querySelector('.usuarios') as HTMLDivElement;
  querySnapshot.forEach(doc => {
    console.log(`${doc.id} => ${doc.data().nome}`);
    const p = document.createElement('p');
    p.innerText = doc.data().nome;
    div.appendChild(p);
  });
}
init();
