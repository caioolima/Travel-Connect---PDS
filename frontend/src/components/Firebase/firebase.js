import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCdnh9JKvR_uXIgzACqx2EtejA0uZevlvo",
  authDomain: "connect-6b8c7.firebaseapp.com",
  projectId: "connect-6b8c7",
  storageBucket: "connect-6b8c7.appspot.com",
  messagingSenderId: "461208770080",
  appId: "1:461208770080:web:232675a8c7b30f99504e45"
};


const firebaseApp = initializeApp(firebaseConfig);

// Obtenha instâncias dos serviços que você precisa
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export { auth, db };