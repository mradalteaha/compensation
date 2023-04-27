import {initializeApp}  from 'firebase/app'
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import {getStorage} from 'firebase/storage'
import {initializeFirestore} from 'firebase/firestore'
import {getFunctions,httpsCallable,connectFunctionsEmulator,httpsCallableFromURL } from 'firebase/functions'

const firebaseConfig = {
  apiKey: "AIzaSyC-5EmvLKx0Re63iVX2Lt7GnXH-FN96kVg",
  authDomain: "datavisualizing.firebaseapp.com",
  projectId: "datavisualizing",
  storageBucket: "datavisualizing.appspot.com",
  messagingSenderId: "593097374469",
  appId: "1:593097374469:web:8bd7c03334bd72b31c556c",
  measurementId: "G-Z8DSX50BHG"
};
  

export const app = initializeApp(firebaseConfig)
export const auth= getAuth(app)
export const storage = getStorage(app)
export const db = initializeFirestore(app , {experimentalForceLongPolling: true ,})
export const functions = getFunctions(app,"us-central1")
connectFunctionsEmulator(functions,'localhots', 5001)
export const hello_http = httpsCallableFromURL(functions, "https://us-central1-datavisualizing.cloudfunctions.net/hello_http");

//export const EncrypGroupKeys = httpsCallableFromURL(functions, "https://us-central1-secret-chat-dev.cloudfunctions.net/EncrypGroupKeys");




export function signIn(email,password) {
  
  return signInWithEmailAndPassword(auth,email,password)
}
export function signUp(email,password){
  return createUserWithEmailAndPassword(auth,email,password)
}
