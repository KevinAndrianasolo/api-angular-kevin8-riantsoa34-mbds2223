# MBDSMagascar2022_2023_api
## Membres du groupe 6 :
- N°08, ANDRIANASOLO LALA Sitrakaharinetsa Kevin
- N°34, RAMANAMPAMONJY Sandratriniaina Riantsoa

## Repositories :
- API : https://github.com/KevinAndrianasolo/api-angular-kevin8-riantsoa34-mbds2223.git
- FRONT : https://github.com/KevinAndrianasolo/front-angular-kevin8-riantsoa34-mbds2223.git

## RENDER.COM
- API : https://api-angular-kevin8-riantsoa34-mbds2223.onrender.com
- FRONT : https://front-angular-kevin8-riantsoa34-mbds2223.onrender.com
## CONNEXION Credentials
- Admin : admin@yopmail.com / Password : test
- User : user@yopmail.com / Password : test
## Lien du cours :
> http://miageprojet2.unice.fr/Intranet_de_Michel_Buffa/M2_MBDS_Madagascar_2022-2023_Introduction_%c3%a0_Angular

## Générateur de données :
> https://mockaroo.com
## Base de données :
> J'ai changer la chaine de connexion mongo dans le fichier `server.js` avec `const uri =...`

- Ancien connection string : mongodb+srv://mb:toto@cluster0.5e6cs7n.mongodb.net/assignments?retryWrites=true&w=majority
- Nouvelle connection string : mongodb+srv://kevinandrianasolo:kpYVPuKME23EDbq0@cluster0.l8mbyvu.mongodb.net/?retryWrites=true&w=majority
- Project : kevin8-riantsoa34-mbds2223
- Username : kevinandrianasolo
- Mdp : kpYVPuKME23EDbq0

## Réorganisation des fichiers:
- J'ai séparé `model` et `schema` pour pouvoir réutiliser les schemas dans toute l'application
- Maintenant on a les fichiers `*.schema.js` et  `*.model.js` pour Prof, assignment, auteur et matiere

## Création du route pour les Matières
- Permet de lister les matières existantes et d'insérer une matière donnée (Pour l'insertion des données de test via Appel API venant du FRONT)

## Insertion d'un assignement:
- Pour pouvoir simuler l'auto incrémentation de l'id de l'assignement , j'ai procédé comme suit:
```ts
const count = await Assignment.countDocuments();
assignment.id=count + 1; // On affecte l'id de l'assignement à insérer comme étant le nombre total des assignments + 1, car le premier id = 1
```
## Login :
- Pour se logger on doit d'abord créer une user :
     "nom",
    "email",
    "password"
    "role",
    "photo"
- L email sert pour s'authentifier ,et le role c'est soit 1 pour l'admin , 0 pour les utilisateurs normales .
- Pour le login, on ajuste besoin de email et password .
- Retourne un jwt token bearer 
## User connecté :
- un informations du client connectés par rapport au token donné dans le bearer
## Securisation des requetes 
- Edit et delete ne peut etre effectué que par admin 


