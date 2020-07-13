import * as firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyBbxuTxDeQbqO3Q6EawvRuwoFaelZbto4E",
  authDomain: "altro-db7f0.firebaseapp.com",
  databaseURL: "https://altro-db7f0.firebaseio.com",
  projectId: "altro-db7f0",
  storageBucket: "altro-db7f0.appspot.com",
  messagingSenderId: "28461951662",
  appId: "1:28461951662:web:fb27677313e64e15cd9b3f",
};
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
