import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import Authentication from "../components/authentication";
import ProfilePage from "../components/profilePage";
import User from "../components/User";

const users: User[] = [
    {
        username: "vincent",
        firstname: "Vincent",
        lastname: "Trélat",
        elo: 1000,
        photoURL: "https://www.w3schools.com/howto/img_avatar.png",
    },
    {
        username: "todor",
        firstname: "Todor",
        lastname: "Peev",
        elo: 1200,
        photoURL: "https://www.w3schools.com/howto/img_avatar2.png",
    },
];

const Home: NextPage = () => {
    return (
        <div>
            <Head>
                <title>MINEBOOK</title>
                <meta name="description" content="Championnat de beauté" />
            </Head>

            <div className="container">
                <Authentication title={"Minebook"} />
            </div>
        </div>
    );
    // return <ProfilePage user={users[0]} />;
};

export default Home;
