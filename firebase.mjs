import {initializeApp} from "firebase/app"

const firebaseConfig = {
  apiKey: "AIzaSyC46AzeOgVhNX1ZdKnxW3WQ87DwXV-nCfw",
  authDomain: "minebook-2287d.firebaseapp.com",
  projectId: "minebook-2287d",
  storageBucket: "minebook-2287d.appspot.com",
  messagingSenderId: "200630172317",
  appId: "1:200630172317:web:052fabb2dc85b67a47b274"
};

export default firebaseConfig;
export const app = initializeApp(firebaseConfig);
