# Minebook
Projet Advanced Software Engineering

## Principe
Le principe est le suivant :
Etablir un classement de beauté entre les utilisateurs. Pour cela, chaque utilisateur ajoute sa photo puis compare les photos des autres utilisateurs deux à deux.
Les données ainsi collectées permettent d'établir un classement.

## API

* `/users`: return a json array of all the users and their information:
  * `[{"firstname": string, "lastname": string, "elo": number, "numberOfGames": number, "photoUrl": string, "username": string}]`
* `/users/<username>`: return only the user having `"username" == username`
