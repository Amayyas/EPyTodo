# EPyTodo - API de Gestion de Tâches

Une API REST complète pour gérer vos tâches (todos) construite avec Node.js, Express et MySQL.

## 📋 Table des Matières

- [Prérequis](#prérequis)
- [Installation](#installation)
- [Configuration](#configuration)
- [Utilisation](#utilisation)
- [Documentation API](#documentation-api)
- [Authentification](#authentification)
- [Schéma de Base de Données](#schéma-de-base-de-données)
- [Structure du Projet](#structure-du-projet)
- [Technologies Utilisées](#technologies-utilisées)
- [Tests](#tests)
- [Contribuer](#contribuer)

## 🔧 Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- **Node.js** (version 14 ou supérieure) - [Télécharger Node.js](https://nodejs.org/)
- **MySQL** (version 5.7 ou supérieure) - [Télécharger MySQL](https://www.mysql.com/downloads/)
- **npm** (inclus avec Node.js)

## 🚀 Installation

### 1. Cloner le projet
```bash
git clone git@github.com:Amayyas/EPyTodo.git
cd EPyTodo
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Configurer la base de données MySQL

#### Créer la base de données
```bash
# Se connecter à MySQL
mysql -u root -p

# Créer la base de données (optionnel si vous utilisez le script)
CREATE DATABASE epytodo;
exit
```

#### Importer le schéma de base de données
```bash
# Importer le schéma complet
cat epytodo.sql | mysql -u root -p
```

## ⚙️ Configuration

### Variables d'environnement

1. Copiez le fichier d'exemple :
```bash
cp .env.example .env
```

2. Modifiez le fichier `.env` avec vos paramètres :
```env
# Configuration de la base de données MySQL
MYSQL_DATABASE=epytodo
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_ROOT_PASSWORD=votre_mot_de_passe_mysql

# Configuration du serveur
PORT=3000

# Clé secrète JWT (utilisez une clé forte en production)
SECRET=votre_cle_secrete_jwt_au_moins_32_caracteres
```

⚠️ **Important** : Changez la valeur de `SECRET` par une chaîne aléatoire et sécurisée en production !

## 🎯 Utilisation

### Mode Développement (avec rechargement automatique)
```bash
npm run dev
```

### Mode Production
```bash
npm start
```

Le serveur sera accessible à l'adresse : `http://localhost:3000`

## 📚 Documentation API

### Points de Terminaison d'Authentification

| Méthode | Route | Protection | Description |
|---------|-------|------------|-------------|
| `POST` | `/register` | ❌ Non | Inscription d'un nouvel utilisateur |
| `POST` | `/login` | ❌ Non | Connexion d'un utilisateur |

### Points de Terminaison Utilisateurs (Routes Protégées)

| Méthode | Route | Protection | Description |
|---------|-------|------------|-------------|
| `GET` | `/user` | 🔒 Oui | Récupérer les informations de l'utilisateur connecté |
| `GET` | `/user/todos` | 🔒 Oui | Récupérer toutes les tâches de l'utilisateur connecté |
| `GET` | `/users/:id` | 🔒 Oui | Récupérer un utilisateur par son ID |
| `GET` | `/users/:email` | 🔒 Oui | Récupérer un utilisateur par son email |
| `PUT` | `/users/:id` | 🔒 Oui | Mettre à jour les informations d'un utilisateur |
| `DELETE` | `/users/:id` | 🔒 Oui | Supprimer un utilisateur |

### Points de Terminaison Tâches (Routes Protégées)

| Méthode | Route | Protection | Description |
|---------|-------|------------|-------------|
| `GET` | `/todos` | 🔒 Oui | Récupérer toutes les tâches |
| `GET` | `/todos/:id` | 🔒 Oui | Récupérer une tâche par son ID |
| `POST` | `/todos` | 🔒 Oui | Créer une nouvelle tâche |
| `PUT` | `/todos/:id` | 🔒 Oui | Mettre à jour une tâche |
| `DELETE` | `/todos/:id` | 🔒 Oui | Supprimer une tâche |

### Exemples de Requêtes

#### Inscription
```bash
curl -X POST http://localhost:3000/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "utilisateur@exemple.com",
    "name": "Nom",
    "firstname": "Prénom",
    "password": "motdepasse123"
  }'
```

#### Connexion
```bash
curl -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "utilisateur@exemple.com",
    "password": "motdepasse123"
  }'
```

#### Créer une tâche
```bash
curl -X POST http://localhost:3000/todos \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer VOTRE_TOKEN_JWT" \
  -d '{
    "title": "Terminer le projet",
    "description": "Finaliser le projet EPyTodo",
    "due_time": "2024-12-31 23:59:59",
    "user_id": 1,
    "status": "todo"
  }'
```

📖 **Pour plus d'exemples détaillés**, consultez le fichier `API_EXAMPLES.md`.

## 🔐 Authentification

Les routes protégées nécessitent un token JWT dans l'en-tête Authorization :

```
Authorization: Bearer <votre_token_jwt>
```

### Processus d'authentification

1. **Inscription** : Créez un compte avec `/register` → Recevez un token JWT
2. **Connexion** : Connectez-vous avec `/login` → Recevez un token JWT
3. **Utilisation** : Incluez le token dans l'en-tête de vos requêtes vers les routes protégées

### Gestion des erreurs d'authentification

| Code d'erreur | Message | Description |
|---------------|---------|-------------|
| `401` | `"No token, authorization denied"` | Aucun token fourni |
| `401` | `"Token is not valid"` | Token invalide ou expiré |
| `401` | `"Invalid Credentials"` | Email ou mot de passe incorrect |
| `409` | `"Account already exists"` | Compte déjà existant lors de l'inscription |

## 🗄️ Schéma de Base de Données

### Table `user`
| Champ | Type | Contraintes | Description |
|-------|------|-------------|-------------|
| `id` | `INT` | `AUTO_INCREMENT`, `PRIMARY KEY` | Identifiant unique |
| `email` | `VARCHAR(255)` | `NOT NULL`, `UNIQUE` | Adresse email |
| `password` | `VARCHAR(255)` | `NOT NULL` | Mot de passe haché |
| `name` | `VARCHAR(255)` | `NOT NULL` | Nom de famille |
| `firstname` | `VARCHAR(255)` | `NOT NULL` | Prénom |
| `created_at` | `DATETIME` | `DEFAULT CURRENT_TIMESTAMP` | Date de création |

### Table `todo`
| Champ | Type | Contraintes | Description |
|-------|------|-------------|-------------|
| `id` | `INT` | `AUTO_INCREMENT`, `PRIMARY KEY` | Identifiant unique |
| `title` | `VARCHAR(255)` | `NOT NULL` | Titre de la tâche |
| `description` | `TEXT` | `NOT NULL` | Description détaillée |
| `created_at` | `DATETIME` | `DEFAULT CURRENT_TIMESTAMP` | Date de création |
| `due_time` | `DATETIME` | `NOT NULL` | Date d'échéance |
| `status` | `ENUM` | `'not started', 'todo', 'in progress', 'done'` | Statut de la tâche |
| `user_id` | `INT` | `FOREIGN KEY → user.id` | Référence vers l'utilisateur |

### Relations
- **Un utilisateur** peut avoir **plusieurs tâches** (relation 1:N)
- La suppression d'un utilisateur supprime automatiquement ses tâches (`ON DELETE CASCADE`)

## 📁 Structure du Projet

```
EPyTodo/
├── 📄 .env                     # Variables d'environnement (non versionné)
├── 📄 .env.example            # Modèle de configuration
├── 📄 .gitignore              # Fichiers à ignorer par Git
├── 📄 package.json            # Dépendances et scripts npm
├── 📄 package-lock.json       # Verrouillage des versions
├── 📄 epytodo.sql            # Schéma de base de données
├── 📄 README.md              # Documentation principale
├── 📄 API_EXAMPLES.md        # Exemples d'utilisation de l'API
├── 🧪 test_api.sh            # Script de test automatisé
└── 📂 src/                   # Code source principal
    ├── 📄 index.js           # Point d'entrée de l'application
    ├── 📂 config/            # Configuration
    │   └── 📄 db.js         # Connexion à la base de données
    ├── 📂 middleware/        # Middlewares personnalisés
    │   ├── 📄 auth.js       # Middleware d'authentification JWT
    │   └── 📄 notFound.js   # Gestion des routes non trouvées
    └── 📂 routes/           # Routes de l'API
        ├── 📂 auth/         # Routes d'authentification
        │   └── 📄 auth.js   # Inscription et connexion
        ├── 📂 todos/        # Routes des tâches
        │   ├── 📄 todos.js  # CRUD des tâches
        │   └── 📄 todos.query.js # Requêtes SQL pour les tâches
        └── 📂 user/         # Routes des utilisateurs
            ├── 📄 user.js   # CRUD des utilisateurs
            └── 📄 user.query.js # Requêtes SQL pour les utilisateurs
```

### Architecture Modulaire

- **🔹 Séparation des responsabilités** : Chaque fonctionnalité dans son propre module
- **🔹 Middleware centralisé** : Authentification et gestion d'erreurs
- **🔹 Requêtes isolées** : Fichiers `.query.js` pour les interactions avec la base de données
- **🔹 Configuration externalisée** : Variables d'environnement dans `.env`

## 🛠️ Technologies Utilisées

| Technologie | Version | Rôle | Documentation |
|-------------|---------|------|---------------|
| **Node.js** | ≥14.0 | Runtime JavaScript | [nodejs.org](https://nodejs.org/) |
| **Express.js** | ^4.18.2 | Framework web | [expressjs.com](https://expressjs.com/) |
| **MySQL2** | ^3.6.0 | Client MySQL | [github.com/sidorares/node-mysql2](https://github.com/sidorares/node-mysql2) |
| **JWT** | ^9.0.2 | Authentification | [jwt.io](https://jwt.io/) |
| **bcryptjs** | ^2.4.3 | Hachage des mots de passe | [npmjs.com/package/bcryptjs](https://www.npmjs.com/package/bcryptjs) |
| **dotenv** | ^16.3.1 | Variables d'environnement | [npmjs.com/package/dotenv](https://www.npmjs.com/package/dotenv) |

### Pourquoi ces choix ?

- **Express.js** : Framework minimaliste et flexible pour Node.js
- **MySQL2** : Client MySQL performant avec support des promesses
- **JWT** : Standard pour l'authentification stateless
- **bcryptjs** : Librairie sécurisée pour le hachage des mots de passe
- **dotenv** : Gestion simple des variables d'environnement

## 🧪 Tests

### Test manuel avec le script fourni
```bash
# Démarrer le serveur
npm start

# Dans un autre terminal, exécuter les tests
chmod +x test_api.sh
./test_api.sh
```

### Test avec des outils externes

#### Avec Postman
1. Importez la collection depuis `API_EXAMPLES.md`
2. Configurez l'environnement avec votre URL de base
3. Lancez les tests séquentiellement

#### Avec curl
Consultez le fichier `API_EXAMPLES.md` pour tous les exemples de requêtes curl.

## 🤝 Contribuer

### Directives de contribution

1. **Fork** le projet
2. Créez une **branche** pour votre fonctionnalité (`git checkout -b feature/nouvelle-fonctionnalite`)
3. **Committez** vos changements (`git commit -m 'Ajouter nouvelle fonctionnalité'`)
4. **Poussez** vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Ouvrez une **Pull Request**

### Standards de code

- Utilisez **ESLint** pour la cohérence du code
- Documentez les nouvelles fonctionnalités
- Ajoutez des tests pour les nouvelles routes
- Respectez la structure de projet existante

## 📞 Support

En cas de problème :

1. 🐛 **Bug** : Ouvrez une issue sur le repository
2. ❓ **Question** : Consultez d'abord `API_EXAMPLES.md`
3. 💡 **Suggestion** : Proposez une amélioration via une Pull Request

---

**✨ Fait avec ❤️ par Amayyas Aouadene, Gabin Schiro & Lohan Lecoq**
