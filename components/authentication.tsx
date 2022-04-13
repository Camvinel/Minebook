import { ChangeEvent, SyntheticEvent, useState, useEffect } from "react";
import firebaseConfig from "../firebase";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"
import { initializeApp } from "firebase/app"

const app = initializeApp(firebaseConfig);
const auth = getAuth();

interface Props {
    title: string;
}

// // User Login info
// const database = [
//     {
//         email: "user1",
//         password: "pass1",
//     },
//     {
//         email: "user2",
//         password: "pass2",
//     },
// ];

const errors = {
    email: "invalid email",
    password: "invalid password",
};

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
			if (user){
				setIsSubmitted(true);
			} else {
				setIsSubmitted(false);
			}
		})
    })

    const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) =>
        setEmail(event.target.value);
    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) =>
        setPassword(event.target.value);

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
				setErrorMessages({name: "pass", message: errorMessage});
			});


        // Validate data
        /* if (email.length === 0 || password.length === 0) {
            return;
        }

        // Find user login info
        const userData = database.find((user) => user.email === email);
        // Compare user info
        if (userData) {
            if (userData.password !== password) {
                // Invalid password
                setErrorMessages({ name: "pass", message: errors.password });
                setPassword("");
            } else {
                setIsSubmitted(true);
                setEmail("");
                setPassword("");
            }
        } else {
            // Email not found
            setErrorMessages({ name: "email", message: errors.email });
            setEmail("");
        } */

        //_______________________ Copilot generated code _____________________
        // // Send data to server
        // const response = await fetch("/api/login", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify({
        //         email,
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
        //         email: email,
        //         password: password
        //     })
        // })
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
