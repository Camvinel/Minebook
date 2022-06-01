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

    const getUsers = async () => {
        // const out = [];
        const q = query(collection(db, "users"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            // out.push(doc.data());
            setUsers((prev) => [...prev, doc]) // add the new document to the "users" array
        });
        // return out;
    };
    // const users = getUsers();
    getUsers();
    console.log("users", users);
    return users.length >= 2 ? (
        <BattlePage user1={users[0]} user2={users[1]} />
    ) : (
        <div>Loading...</div>
    );
};
export default Battle;
