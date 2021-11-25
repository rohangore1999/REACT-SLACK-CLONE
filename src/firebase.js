import firebase from 'firebase'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBFEDh_oCljZPNb1_9mzbUAUJoU_cBIX-I",
  authDomain: "slack-clone-63483.firebaseapp.com",
  projectId: "slack-clone-63483",
  storageBucket: "slack-clone-63483.appspot.com",
  messagingSenderId: "1086123441454",
  appId: "1:1086123441454:web:3d912f17109a90f9e18ebf",
  measurementId: "G-J18BGXMYSB"
};

// it will connect react and firebase
const firebaseApp = firebase.initializeApp(firebaseConfig)


/*
*** Firebase database structure(NoSQL dataabse) ***

Collections --> | Documents | Collections | Documents
                |           |             |
In our case     |           |             |
                |           |             |
Rooms           | info/docs |  messages   | info/docs of messages


*/
const db = firebaseApp.firestore();

const auth = firebase.auth()

// sign in with google pop up
const provider = new firebase.auth.GoogleAuthProvider();

// to use in other components
export { auth, db, provider }