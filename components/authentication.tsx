import { ChangeEvent, SyntheticEvent, useState } from "react";
import ProfilePage from "./profilePage";
import { User } from "./User";
// import users from "../components/users.json";
import users from "../components/users.js";
import Cookies from "js-cookie";

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
    {
        username: "nguyen",
        password: "nguyen",
    },
];

const errors = {
    username: "invalid username",
    password: "invalid password",
};

const fetchUser = (username: string) => {
    for (const user of users) {
        console.log(user);
        if (user.username === username) {
            return user;
        }
    }
};

const Authentication = ({ title }: Props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errorMessages, setErrorMessages] = useState({
        name: "",
        message: "",
    });

    const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) =>
        setUsername(event.target.value);
    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) =>
        setPassword(event.target.value);

    // const navigate = useNavigate();

    const handleSubmit = async (event: SyntheticEvent) => {
        console.log("Username: " + username);
        console.log("Password: " + password);

        // Prevent browser to submit
        event.preventDefault();
        // Validate data
        if (username.length === 0 || password.length === 0) {
            return;
        }

        // Find user login info
        const userData = database.find((user) => user.username === username);
        // Compare user info
        if (userData) {
            if (userData.password !== password) {
                // Invalid password
                setErrorMessages({ name: "pass", message: errors.password });
                setPassword("");
                Cookies.remove("username");
            } else {
                // Valid password
                setIsSubmitted(true);
                Cookies.set("username", username);
            }
        } else {
            // Username not found
            setErrorMessages({ name: "username", message: errors.username });
            setUsername("");
            setPassword("");
            Cookies.remove("username");
        }
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
                            type="username"
                            className="form-control"
                            id="floatingInput"
                            placeholder="Identifiant"
                            required
                            onChange={handleUsernameChange}
                            value={username}
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
                        {renderErrorMessage("username")}
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

    if (isSubmitted) {
        window.location.href = "/profile";
    } else {
        return notLoggedInPage;
    }
};

export default Authentication;
