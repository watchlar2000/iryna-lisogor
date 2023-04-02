import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC9omkhaFKikJECwxtvZgClOiNBcPhIsns",
  authDomain: "lisogorka-portfolio.firebaseapp.com",
  projectId: "lisogorka-portfolio",
  storageBucket: "lisogorka-portfolio.appspot.com",
  messagingSenderId: "632658445697",
  appId: "1:632658445697:web:595e88d84bd40d3e265480",

  //   apiKey: process.env.VUE_API_KEY,
  //   authDomain: process.env.VUE_AUTH_DOMAIN,
  //   projectId: process.env.VUE_PROJECT_ID,
  //   storageBucket: process.env.VUE_STORAGE_BUCKET,
  //   messagingSenderId: process.env.VUE_MESSAGING_SENDER_ID,
  //   appId: process.env.VUE_APP_ID,
};

// init firebase app
export const firebaseApp = initializeApp(firebaseConfig);

// init services
export const db = getFirestore(firebaseApp);
