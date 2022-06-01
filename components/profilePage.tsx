import getRank, { User } from "./User";
import { useState } from "react";
import firebaseConfig from "../firebase";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { doc, getDoc } from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth"

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

interface Props {
    uid: string;
}

const auth = getAuth();
const ProfilePage = ({ uid }: Props) => {
    const [user, setUser] = useState({
        username: "",
        firstname: "",
        lastname: "",
        elo: 1000,
        photoURL: "",
        numberOfGames: 0,
    });
    const [loaded, setLoaded] = useState(false);

    const getUser = async () => {
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            setUser(docSnap.data() as any);
            setLoaded(true);
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            setUser(undefined);
            setLoaded(false);
        }
    };

    if (!loaded) getUser();

    let isClicked = false;
    const renderPage = () => (
        <body className="background">
            <div className="TitlePage">MineBook</div>
            <h1 id="profile">Profil</h1>
            <div className="profile-container">
                <div className="profile-row">
                    <div className="profile-column">
                        <div className="profile-info">
                            <div className="profile-info-name">
                                {user.firstname + " " + user.lastname}
                            </div>
                            <div className="profile-info-element">
                                {"Score: " + user.elo}
                            </div>
                            <div className="profile-info-element">
                                {"Classement: " + getRank(user)}
                            </div>
                            <button className="button-deco" onClick = {
                                () => {
                                    signOut(auth);
                                    window.location.href = "/";
                                }
                                }>Déconnexion</button>
                        </div>
                    </div>
                    <div className="profile-column">
                        <div className="profile-picture">
                            <img
                                className="profile-picture-image"
                                src={user.photoURL}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="button-container">
                <button
                    type="button"
                    className="button-profile"
                    onClick={(event) => (window.location.href = "/battle")}
                >
                    Juger !
                </button>
            </div>
        </body>
    );
    return user ? renderPage() : <div>Loading...</div>;
};

export default ProfilePage;
