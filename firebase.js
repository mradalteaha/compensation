import {initializeApp} from 'firebase/app'
import {getStorage} from 'firebase/storage'
import {initializeFirestore} from 'firebase/firestore'
import * as functions  from 'firebase-functions'
import * as  admin from 'firebase-admin'
import {getFunctions,httpsCallable,connectFunctionsEmulator,httpsCallableFromURL } from 'firebase/functions'

import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC-5EmvLKx0Re63iVX2Lt7GnXH-FN96kVg",
  authDomain: "datavisualizing.firebaseapp.com",
  projectId: "datavisualizing",
  storageBucket: "datavisualizing.appspot.com",
  messagingSenderId: "593097374469",
  appId: "1:593097374469:web:8bd7c03334bd72b31c556c",
  measurementId: "G-Z8DSX50BHG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
admin.initializeApp();


  const firebase = initializeApp(firebaseConfig)
  export const storage = getStorage(firebase)
  export const db = initializeFirestore(firebase , {experimentalForceLongPolling: true ,}) 
  export const hello_http = httpsCallableFromURL("https://us-central1-datavisualizing.cloudfunctions.net/hello_http")
  export default firebase;


  