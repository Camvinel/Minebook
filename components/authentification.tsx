import { ChangeEvent, SyntheticEvent, useState } from 'react'

interface Props {
    title: string
}

const Authentification = ({title}: Props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => setUsername(event.target.value);
    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value);

    const handleSubmit = async (event: SyntheticEvent) => {
        
        // Prevent browser to submit
        event.preventDefault()
        // Validate data
        if (username.length === 0 || password.length === 0) {
            return
        }
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
        console.log("Username: "+username);
        console.log("Password: "+password);
        setUsername("");
        setPassword("");
    }

    return (
        <div className="background">
            <div className="container text-center">
                <div className="title">
                    <h1 id="formTitle">{title}</h1>
                </div>
            </div>
            <div className="boxFollowing">
                <div className="container text-center">
                    <form className="form-floating mt-3" onSubmit={handleSubmit}>
                        <div className="input-container">
                            <input type="username" className="form-control" id="floatingInput" placeholder="Identifiant" required onChange={handleUsernameChange} value={username}/>
                        </div>
                        <div className="input-container">
                            <input type="password" className="form-control" id="floatingInput" placeholder="Mot de passe" required onChange={handlePasswordChange} value={password}/>
                        </div>
                        <div className="button-container">
                            <button type="submit" className="button">Se connecter</button>
                        </div>
                    </form>
                </div>
            </div >
        </div >
    )
}

export default Authentification