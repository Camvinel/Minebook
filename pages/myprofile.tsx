import { NextPage } from "next";
import ProfilePage from "../components/profilePage";
import firebaseConfig from "../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { useEffect, useState } from "react";

const app = initializeApp(firebaseConfig);
const auth = getAuth();

const Profile: NextPage = () => {
    const [uid, setUid] = useState("");
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUid(auth.currentUser.uid);
            } else {
                setUid(undefined);
            }
        });
    });
    console.log(uid);
    return uid ? <ProfilePage uid={uid} /> : <div>Loading...</div>;
};

export default Profile;
