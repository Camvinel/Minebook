import { NextPage } from "next";
import React, { useState } from "react";
import BattlePage from "../components/battlePage";
import firebaseConfig from "../firebase.mjs";
import {
    collection,
    getFirestore,
    query,
    where,
    getDocs,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


const Battle: NextPage = () => {
    const [users, setUsers] = useState([])
    const [fetched, setFetched] = useState(false)

    const getUsers = async () => {
        const q = query(collection(db, "users"));
        const querySnapshot = await getDocs(q);
        setUsers(querySnapshot.docs.map((doc) => doc.data()))
        setFetched(true);
    };
    !fetched && getUsers() // avoid infinite fetch loop
    console.log("users", users);
    return users.length >= 2 ? (
        <BattlePage user1={users[0]} user2={users[1]} />
    ) : (
        <div>Loading...</div>
    );
};
export default Battle;
