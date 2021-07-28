import * as firebase from 'firebase'
require('@firebase/firestore')

  var firebaseConfig = {
    apiKey: "AIzaSyADKafGaPGDQ1qLMsTa5kWvYG1qL6sQaTc",
    authDomain: "class-91-15e1d.firebaseapp.com",
    projectId: "class-91-15e1d",
    storageBucket: "class-91-15e1d.appspot.com",
    messagingSenderId: "609906544859",
    appId: "1:609906544859:web:7b28608c338ade622fbcfe"
  };
  // tialize Firebase
  firebase.initializeApp(firebaseConfig);
export default firebase.firestore();