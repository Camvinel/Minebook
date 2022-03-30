import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import Authentication from "../components/authentication";
import ProfilePage from "../components/profilePage";
import User from "../components/User";

const vincent: User = {
    firstname: "Vincent",
    lastname: "Trélat",
    elo: 1000,
    photoURL: "",
};

const Home: NextPage = () => {
    // return (
    //     <div>
    //         <Head>
    //             <title>MINEBOOK</title>
    //             <meta name="description" content="Championnat de beauté" />
    //         </Head>

    //         <div className="container">
    //             <Authentication title={"Minebook"} />
    //         </div>
    //     </div>
    // );
    return <ProfilePage user={vincent} />;
};

export default Home;
