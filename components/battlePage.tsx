import { NextPage } from "next";
import { Button } from "react-bootstrap";
import users from "../components/users.json";
import { User } from "../components/User";

interface Props {
    user1: User;
    user2: User;
}

const Battle = ({ user1, user2 }: Props) => {
    const voteLeft = () => {
        console.log("Click left");
    };

    const voteRight = () => {
        console.log("Click right");
    };

    const voteDraw = () => {
        console.log("Click draw");
    };

    const id1 = Math.floor(Math.random() * Object.keys(users).length);
    let id2 = Math.floor(Math.random() * Object.keys(users).length);
    while (id2 === id1) {
        id2 = Math.floor(Math.random() * Object.keys(users).length);
    }

    console.log(user1);
    console.log(user2);

    const url1 = user1?.photoURL;
    const url2 = user2?.photoURL;

    const renderPage = (
        <body className="background">
            <div className="TitlePage">MineBook</div>
            <h1 id="profile">Battle</h1>
            <div className="battle-container">
                <div className="image-row">
                    <div className="image-column">
                        <div className="image-container">
                            <Button className="image-button" onClick={voteLeft}>
                                <img className="image-image" src={url1} />
                            </Button>
                        </div>
                    </div>
                    <div className="image-column">
                        <div className="image-container">
                            <Button
                                className="image-button"
                                onClick={voteRight}
                            >
                                <img className="image-image" src={url2} />
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="imgage-row">
                    <Button className="draw-button" onClick={voteDraw}>
                        {" "}
                        Égalité{" "}
                    </Button>
                </div>
            </div>
        </body>
    );
    return renderPage;
};

export default Battle;
