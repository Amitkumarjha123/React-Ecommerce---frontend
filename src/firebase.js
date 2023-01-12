import * as firebase from "firebase";

  const firebaseConfig = {
    apiKey: "AIzaSyAax-VNu-11BylC9xxR8Ej_GvSlBPLY5IU",
    authDomain: "ecommeree-13948.firebaseapp.com",
    projectId: "ecommeree-13948",
    storageBucket: "ecommeree-13948.appspot.com",
    messagingSenderId: "842709214437",
    appId: "1:842709214437:web:b302a094f46b06ff5aa00c"
  };

  
  firebase.initializeApp(firebaseConfig);
  export const auth=firebase.auth();
  export const googleAuthProvider=new firebase.auth.GoogleAuthProvider();
  