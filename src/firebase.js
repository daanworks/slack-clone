import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCi3uZpTRTx9oUW1vTup1ExgzbSnHCAf_o",
  authDomain: "slack-clone-389ed.firebaseapp.com",
  projectId: "slack-clone-389ed",
  storageBucket: "slack-clone-389ed.appspot.com",
  messagingSenderId: "326537692757",
  appId: "1:326537692757:web:778a87ea80d7d65af8b6dc"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();


export { auth, provider };
export default db;
