import { ChangeEvent, SyntheticEvent, useState } from "react";

interface Props {
    title: string;
}

// User Login info
const database = [
    {
        username: "user1",
        password: "pass1",
    },
    {
        username: "user2",
        password: "pass2",
    },
];

const errors = {
    username: "invalid username",
    password: "invalid password",
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
            } else {
                setIsSubmitted(true);
            }
        } else {
            // Username not found
            setErrorMessages({ name: "username", message: errors.username });
        }

        //_______________________ Copilot generated code _____________________
        // // Send data to server
        // const response = await fetch("/api/login", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify({
        //         username,
        //         password
        //     })
        // })
        // // Get response
        // const data = await response.json()
        // // Check response
        // if (data.success) {
        //     // Redirect to home
        //     window.location.href = "/"
        // } else {
        //     // Display error
        //     alert(data.message)
        // }
        //____________________________________________________________________

        // Send data
        // const url: string = '';
        // await fetch(url, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         username: username,
        //         password: password
        //     })
        // })

        // Clear state
        setUsername("");
        setPassword("");
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

    return (
        <div className="background">
            <div className="container text-center">
                <div className="title">
                    <h1 id="formTitle">{title}</h1>
                </div>
                {isSubmitted ? (
                    <div>User is successfully logged in</div>
                ) : (
                    renderForm
                )}
            </div>
        </div>
    );
};

export default Authentication;
