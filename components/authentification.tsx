const Authentification = () => {
    return (
        <div className="background">
            <div className="container text-center">
                <div className="title">
                    <h1>Minebook</h1>
                </div>
            </div>
            <div className="boxFollowing">
                <div className="container text-center">
                    <form className="form-floating mt-3">
                        <input type="email" className="form-control" id="floatingInput" placeholder="Identifiant" />
                        <label htmlFor="floatingInput">Identifiant</label>
                    </form>
                    <form className="form-floating mt-3">
                        <input type="password" className="form-control" id="floatingInput2" placeholder="Mot de passe" />
                        <label htmlFor="floatingInput2">Mot de passe</label>
                    </form>
                    <button type="submit" className="button">Se connecter</button>
                </div>
            </div >
        </div >
    )
}

export default Authentification