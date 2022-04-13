import { EOL } from "os";
import { useState, ChangeEvent, SyntheticEvent } from "react";
import { mutate } from "swr";
import { User } from "./User";

const CreateAccount = () => {
    const [username = "", setUsername] = useState("");
    const [firstName, setFistname] = useState("");
    const [lastName, setLastname] = useState("");
    const [picture, setPicture] = useState(null);
    const [elo, setElo] = useState(null);

    const handleFirstnameChange = (event: ChangeEvent<HTMLInputElement>) =>
        setFistname(event.target.value);
    const handleLastnameChange = (event: ChangeEvent<HTMLInputElement>) =>
        setLastname(event.target.value);
    const handlePictureChange = (event: ChangeEvent<HTMLInputElement>) =>
        setPicture(event.target.value);
    let user: User = {
        username: username,
        firstname: firstName,
        lastname: lastName,
        elo: elo,
        photoURL: "",
    };
    const handleSubmit = async (event: SyntheticEvent) => {
        event.preventDefault();
        if (firstName.length == 0 || lastName.length == 0 || picture == null) {
            return;
        }

        await fetch("https://minesbook.herokuapp.com/accounts?page=0", {
            method: "POST",
            headers: { "Content-Type": "application/json" },

            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                picture: picture,
            }),
        });
        mutate("https://minesbook.herokuapp.com/accounts");

        setPicture(null);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <input
                    className="form-control"
                    type="text"
                    placeholder="Votre prénom"
                    required
                    onChange={handleFirstnameChange}
                />
            </div>
            <div className="form-group">
                <input
                    className="form-control"
                    type="text"
                    placeholder="Votre nom de famille"
                    required
                    onChange={handleLastnameChange}
                />
            </div>
            <div className="form-group">
                <label>Importez votre photo</label>
                <input
                    type="file"
                    className="form-control-file"
                    id="picture"
                    required
                    onChange={handlePictureChange}
                />
            </div>
            <div className="form-group">
                <button type="submit" className="btn btn-outline-secondary">
                    Créer
                </button>
            </div>
        </form>
    );
};

export default CreateAccount;
