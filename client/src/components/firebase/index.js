import firebase from 'firebase/app';
import 'firebase/storage';
const firebaseConfig = {
  apiKey: "AIzaSyB2LGIuqDnnQ4FpUNp13QDIILbX29XY3Ac",
  authDomain: "gamecity-87e5e.firebaseapp.com",
  projectId: "gamecity-87e5e",
  storageBucket: "gamecity-87e5e.appspot.com",
  messagingSenderId: "707344265375",
  appId: "1:707344265375:web:15197ed6e564af63d872aa",
  measurementId: "G-MP33H3WLQ4"
};
  firebase.initializeApp(firebaseConfig);
  const storage=firebase.storage();
  export {storage , firebase as default};