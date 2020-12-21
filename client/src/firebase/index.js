import firebase from "firebase/app";
import "firebase/storage";

// Your web app's Firebase configuration

var firebaseConfig = {
  apiKey: "AIzaSyCLIe93kpSL5HELsYeNox8_pNzz655AeLs",
  authDomain: "gamesity-fcdbf.firebaseapp.com",
  projectId: "gamesity-fcdbf",
  storageBucket: "gamesity-fcdbf.appspot.com",
  messagingSenderId: "579094383614",
  appId: "1:579094383614:web:a474d1dab0998f228c4eaf",
  measurementId: "G-ZPS45VNC9L",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
