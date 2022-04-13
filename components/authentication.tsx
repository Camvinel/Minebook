import { ChangeEvent, SyntheticEvent, useState, useEffect } from "react";
import firebaseConfig from "../firebase";
import {
    getAuth,
    signInWithEmailAndPassword,
    onAuthStateChanged,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import ProfilePage from "./profilePage";
import { User } from "./User";

const app = initializeApp(firebaseConfig);
const auth = getAuth();

interface Props {
    title: string;
}

// User Login info
const database = [
    {
        username: "vincent",
        password: "vincent",
    },
    {
        username: "todor",
        password: "todor",
    },
];

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

const errors = {
    email: "invalid email",
    password: "invalid password",
};

const fetchUser = (username: string) =>
    users.find((user) => user.username === username);

const Authentication = ({ title }: Props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errorMessages, setErrorMessages] = useState({
        name: "",
        message: "",
    });

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsSubmitted(true);
            } else {
                setIsSubmitted(false);
            }
        });
    });

    const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) =>
        setEmail(event.target.value);
    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) =>
        setPassword(event.target.value);

    // const navigate = useNavigate();

    const handleSubmit = async (event: SyntheticEvent) => {
        console.log("Email: " + email);
        console.log("Password: " + password);

        // Prevent browser to submit
        event.preventDefault();

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                setIsSubmitted(true);
                const user = userCredential.user;
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMessages({ name: "pass", message: errorMessage });
            });
    };

    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
            <div className="error">Error: {errorMessages.message}</div>
        );

    const renderForm = (
        <div className="boxFollowing">
            <div className="container text-center">
                <form className="form-floating mt-3" onSubmit={handleSubmit}>
                    <div className="input-container">
                        <input
                            type="email"
                            className="form-control"
                            id="floatingInput"
                            placeholder="Identifiant"
                            required
                            onChange={handleEmailChange}
                            value={email}
                        />
                    </div>
                    <div className="input-container">
                        <input
                            type="password"
                            className="form-control"
                            id="floatingInput"
                            placeholder="Mot de passe"
                            required
                            onChange={handlePasswordChange}
                            value={password}
                        />
                        {renderErrorMessage("email")}
                        {renderErrorMessage("pass")}
                    </div>
                    <div className="button-container">
                        <button type="submit" className="button">
                            Se connecter
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );

    const notLoggedInPage = (
        <div className="background">
            <div className="container text-center">
                <div className="title">
                    <h1 id="formTitle">{title}</h1>
                </div>
                {renderForm}
            </div>
        </div>
    );

    return isSubmitted ? (
        <div>Logged In</div>
    ) : (
        // <ProfilePage user={auth.currentUser.uid} />
        notLoggedInPage
    );
};

export default Authentication;
