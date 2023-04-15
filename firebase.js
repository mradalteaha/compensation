import {initializeApp} from 'firebase/app'
import {getStorage} from 'firebase/storage'
import {initializeFirestore} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBZHNDMXGkZLs_RfIUdOca4lKS7E1qus6E",
    authDomain: "ramadan-contest-a9f64.firebaseapp.com",
    projectId: "ramadan-contest-a9f64",
    storageBucket: "ramadan-contest-a9f64.appspot.com",
    messagingSenderId: "235677682348",
    appId: "1:235677682348:web:f6e99d91043cfbbe7ead09"
  };
  
 
  const firebase = initializeApp(firebaseConfig)
  export const storage = getStorage(firebase)
  export const db = initializeFirestore(firebase , {experimentalForceLongPolling: true ,}) 
  export default firebase;
  