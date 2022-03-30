import { ChangeEvent, SyntheticEvent, useState } from "react";
import User from "./User";

interface Props {
    user: User;
}

const ProfilePage = ({ user }: Props) => {
    const renderPage = (
        <body className="background">
            <h1 id="profile">Profil</h1>
            <div className="profile-container">
                <div className="profile-row">
                    <div className="profile-column">
                        <div className="profile-info">
                            <div>{user.firstname}</div>
                            <div>{user.lastname}</div>
                            <div>{user.elo}</div>
                        </div>
                    </div>
                    <div className="profile-column">
                        <div className="profile-picture">
                            <img
                                className="profile-picture-image"
                                src="https://www.w3schools.com/howto/img_avatar.png"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </body>
    );
    return renderPage;
};

export default ProfilePage;
