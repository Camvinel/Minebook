import { ChangeEvent, SyntheticEvent, useState } from "react";
import User from "./User";

interface Props {
    user: User;
}

const ProfilePage = ({ user }: Props) => {
    const renderPage = (
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
                            <div className="profile-info-elo">
                                {"Score: " + user.elo}
                            </div>
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
                    onClick={(event) => (window.location.href = "/")}
                >
                    Juger !
                </button>
            </div>
        </body>
    );
    return renderPage;
};

export default ProfilePage;
