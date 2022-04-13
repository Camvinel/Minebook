import { NextPage } from "next";
import { Button } from "react-bootstrap";
import users from "../components/users.json";

const Battle: NextPage = () => {
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

    const url1 = users[id1].photoURL;
    const url2 = users[id2].photoURL;

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
