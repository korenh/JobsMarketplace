importScripts("https://www.gstatic.com/firebasejs/5.5.6/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/5.5.6/firebase-messaging.js");

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

const messaging = firebase.messaging();
