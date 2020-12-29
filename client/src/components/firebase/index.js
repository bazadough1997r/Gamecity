import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyCZabDIPrGEsu1ZN34aZoFWUnd6hX2Mni8",
    authDomain: "gamecity-569d0.firebaseapp.com",
    projectId: "gamecity-569d0",
    storageBucket: "gamecity-569d0.appspot.com",
    messagingSenderId: "747167166541",
    appId: "1:747167166541:web:da0d28dea7f67dfd6cac04",
    measurementId: "G-9X1KFGQ8RH"
  };

  firebase.initializeApp(firebaseConfig);

  const storage=firebase.storage();
 
  export {storage , firebase as default};