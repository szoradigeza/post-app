import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const config = {
  apiKey: "AIzaSyC2k9b5h64ur4Y_gUrtw4oev8DRpPrs2Ow",
  authDomain: "react-blog-demo-68ce9.firebaseapp.com",
  projectId: "react-blog-demo-68ce9",
  storageBucket: "react-blog-demo-68ce9.appspot.com",
  messagingSenderId: "404476717782",
  appId: "1:404476717782:web:21d322f9bd91c96be5b777",
  measurementId: "G-VM8HT2RSGG",
};
firebase.initializeApp(config);

export default firebase;
