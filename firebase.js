import * as firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyCYDas7lUiLKfoRMZQY_jlL3eQTO0AqO80",
  authDomain: "chat-app-c452c.firebaseapp.com",
  projectId: "chat-app-c452c",
  storageBucket: "chat-app-c452c.appspot.com",
  messagingSenderId: "1007991464683",
  appId: "1:1007991464683:web:ac24b9ba6426a873a554ae",
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };
