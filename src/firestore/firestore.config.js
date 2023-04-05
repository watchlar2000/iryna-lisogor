import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.VUE_API_KEY,
  authDomain: process.env.VUE_AUTH_DOMAIN,
  projectId: "lisogorka-portfolio",
  storageBucket: process.env.VUE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_ID,
};

// init firebase app
export const firebaseApp = initializeApp(firebaseConfig);

// init services
export const db = getFirestore(firebaseApp);
