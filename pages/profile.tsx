import { NextPage } from "next";
import ProfilePage from "../components/profilePage";
import firebaseConfig from "../firebase";
import {
    getAuth,
    signInWithEmailAndPassword,
    onAuthStateChanged,
} from "firebase/auth";
import { initializeApp } from "firebase/app";

const app = initializeApp(firebaseConfig);
const auth = getAuth();

const Profile: NextPage = () => {
    const uid = auth.currentUser.uid;
    return <ProfilePage uid={uid} />;
};

export default Profile;
