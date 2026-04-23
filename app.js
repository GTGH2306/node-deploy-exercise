// On importe le module "http" intégré à Node.js.
const http = require('http');

// On lit le port d'abord depuis les variables d'environnement (process.env),
// et si aucune n'est définie, on utilise 3000 par défaut.
const PORT = process.env.PORT || 3000;

// L'environnement applicatif (ex: "development", "production", "staging").
// Permet d'adapter le comportement de l'app selon le contexte de déploiement.
const APP_ENV = process.env.APP_ENV || 'development';

// Un message secret lu depuis les variables d'environnement.
// Bonne pratique : ne jamais mettre de secrets directement dans le code,
// mais les injecter via des variables d'environnement au moment du déploiement.
const SECRET_MESSAGE = process.env.SECRET_MESSAGE || '(aucun secret défini)';

// On crée le serveur HTTP.
// La fonction passée en paramètre est appelée à chaque fois qu'un client envoie une requête :
//   - "req" (request)  : contient les informations de la requête entrante (URL, méthode, headers…)
//   - "res" (response) : permet de construire et d'envoyer la réponse au client
const server = http.createServer((req, res) => {
  // On envoie un en-tête HTTP avec le code 200 (= succès)
  // et on indique que la réponse est du texte brut (pas du HTML ni du JSON).
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  // On envoie le corps de la réponse et on termine la connexion.
  // Les variables APP_ENV et SECRET_MESSAGE sont interpolées dans la chaîne (template literal).
  res.end(`Bonjour ! Environnement : ${APP_ENV}\nMessage secret : ${SECRET_MESSAGE}\n`);
});

// On démarre le serveur sur le port choisi.
// La fonction de rappel (callback) est exécutée une seule fois, dès que le serveur est prêt.
server.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT} en mode ${APP_ENV}`);
});

// Cette condition vérifie si le fichier est exécuté directement (node app.js)
// ou importé par un autre fichier (require('./app')).
// Si le fichier est importé (ex: dans les tests automatisés), on exporte l'objet serveur
// pour que le code appelant puisse le contrôler (le démarrer, l'arrêter, etc.).
if (require.main !== module) {
  module.exports = server;
}