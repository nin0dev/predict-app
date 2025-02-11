from pymongo import MongoClient
from pymongo.errors import ConnectionFailure
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime, timezone

# URL de connexion à MongoDB
mongo_url = "mongodb+srv://mohamedhaddad:pI4gZqSCWuXVWjeH@cluster0.pyhbz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

try:
    # Initialiser le client MongoDB
    client = MongoClient(mongo_url)

    # Tester la connexion
    client.admin.command('ping')
    print("Connexion réussie à MongoDB !")

    # Sélectionner la base de données et les collections
    db = client['projetmobile2']
    users_collection = db['users']
    annonces_collection = db['annonces']

    # ====================== FONCTIONS UTILISATEURS ==========================
    def inscrire_user(email, username, password, confirm_password, nom, prenom, adresse):
        """Inscription d'un utilisateur."""
        if users_collection.find_one({"email": email}):
            return "Cet email est déjà utilisé."
        if users_collection.find_one({"username": username}):
            return "Ce nom d'utilisateur est déjà pris."

        if password != confirm_password:
            return "Les mots de passe ne correspondent pas."

        hashed_password = generate_password_hash(password)
        user_data = {
            "email": email,
            "username": username,
            "password": hashed_password,
            "nom": nom,
            "prenom": prenom,
            "adresse": adresse,
        }
        users_collection.insert_one(user_data)
        return "Utilisateur inscrit avec succès !"

    def login_user(email, password):
        """Connexion d'un utilisateur."""
        user = users_collection.find_one({"email": email})
        if not user:
            return "Utilisateur non trouvé."

        if check_password_hash(user["password"], password):
            return f"Connexion réussie ! Bienvenue, {user['prenom']} {user['nom']}."
        else:
            return "Mot de passe incorrect."

    # ====================== FONCTIONS ANNONCES ==============================
    def ajouter_annonce(email_user, type_annonce, titre, description, prix, adresse, photos):
        """Ajouter une annonce immobilière avec photos."""
        user = users_collection.find_one({"email": email_user})
        if not user:
            return "Utilisateur non trouvé. Impossible d'ajouter une annonce."

        annonce_data = {
            "type_annonce": type_annonce,  # vente ou location
            "titre": titre,
            "description": description,
            "prix": prix,
            "adresse": adresse,
            "nom_vendeur": f"{user['prenom']} {user['nom']}",
            "email_vendeur": user["email"],
            "date_creation": datetime.now(timezone.utc),
            "photos": photos,  # Nouvelle clé pour stocker les URLs des photos
        }
        annonces_collection.insert_one(annonce_data)
        return "Annonce ajoutée avec succès !"

    def consulter_annonces():
        """Consulter toutes les annonces disponibles."""
        annonces = annonces_collection.find()
        resultat = []
        for annonce in annonces:
            resultat.append({
                "id": str(annonce["_id"]),
                "titre": annonce["titre"],
                "type_annonce": annonce["type_annonce"],
                "description": annonce["description"],
                "prix": annonce["prix"],
                "adresse": annonce["adresse"],
                "nom_vendeur": annonce["nom_vendeur"],
                "email_vendeur": annonce["email_vendeur"],
                "date_creation": annonce["date_creation"].strftime('%Y-%m-%d %H:%M:%S'),
                "photos": annonce.get("photos", []),  # Inclure les photos si elles existent
            })
        return resultat

    def modifier_annonce(id_annonce, email_user, nouveau_titre, nouvelle_description, nouveau_prix, nouvelle_adresse, nouvelles_photos):
        """Modifier une annonce existante avec photos."""
        user = users_collection.find_one({"email": email_user})
        if not user:
            return "Utilisateur non trouvé."

        annonce = annonces_collection.find_one({"_id": id_annonce, "email_vendeur": email_user})
        if not annonce:
            return "Annonce introuvable ou vous n'avez pas l'autorisation de la modifier."

        annonces_collection.update_one(
            {"_id": id_annonce},
            {
                "$set": {
                    "titre": nouveau_titre,
                    "description": nouvelle_description,
                    "prix": nouveau_prix,
                    "adresse": nouvelle_adresse,
                    "photos": nouvelles_photos,  # Mettre à jour les photos
                    "date_modification": datetime.now(timezone.utc),
                }
            }
        )
        return "Annonce mise à jour avec succès !"

    def supprimer_annonce(id_annonce, email_user):
        """Supprimer une annonce existante."""
        annonce = annonces_collection.find_one({"_id": id_annonce, "email_vendeur": email_user})
        if not annonce:
            return "Annonce introuvable ou vous n'avez pas l'autorisation de la supprimer."

        annonces_collection.delete_one({"_id": id_annonce})
        return "Annonce supprimée avec succès."

    # ====================== INTERFACE UTILISATEUR ============================
    choix = input("Voulez-vous inscrire, connecter un utilisateur ou gérer des annonces ? (inscrire/login/annonce) : ").strip().lower()
    if choix == "inscrire":
        email = input("Entrez votre email : ").strip()
        username = input("Entrez votre nom d'utilisateur : ").strip()
        password = input("Entrez votre mot de passe : ").strip()
        confirm_password = input("Confirmez votre mot de passe : ").strip()
        nom = input("Entrez votre nom : ").strip()
        prenom = input("Entrez votre prénom : ").strip()
        adresse = input("Entrez votre adresse : ").strip()
        print(inscrire_user(email, username, password, confirm_password, nom, prenom, adresse))
    elif choix == "login":
        email = input("Entrez votre email : ").strip()
        password = input("Entrez votre mot de passe : ").strip()
        print(login_user(email, password))
    elif choix == "annonce":
        action = input("Voulez-vous ajouter, consulter, modifier ou supprimer des annonces ? (ajouter/consulter/modifier/supprimer) : ").strip().lower()
        if action == "ajouter":
            email_user = input("Entrez votre email : ").strip()
            type_annonce = input("Type d'annonce (vente/location) : ").strip().lower()
            titre = input("Titre de l'annonce : ").strip()
            description = input("Description de l'annonce : ").strip()
            prix = float(input("Prix (en euros) : ").strip())
            adresse = input("Adresse du bien immobilier : ").strip()
            photos = input("Entrez les URLs des photos, séparées par des virgules : ").strip().split(',')
            print(ajouter_annonce(email_user, type_annonce, titre, description, prix, adresse, photos))
        elif action == "consulter":
            annonces = consulter_annonces()
            for annonce in annonces:
                print("\n---")
                print(f"ID : {annonce['id']}")
                print(f"Titre : {annonce['titre']}")
                print(f"Type : {annonce['type_annonce']}")
                print(f"Description : {annonce['description']}")
                print(f"Prix : {annonce['prix']} €")
                print(f"Adresse : {annonce['adresse']}")
                print(f"Vendeur : {annonce['nom_vendeur']} ({annonce['email_vendeur']})")
                print(f"Date de création : {annonce['date_creation']}")
                print(f"Photos : {', '.join(annonce['photos'])}")
        elif action == "modifier":
            id_annonce = input("Entrez l'ID de l'annonce à modifier : ").strip()
            email_user = input("Entrez votre email : ").strip()
            nouveau_titre = input("Nouveau titre de l'annonce : ").strip()
            nouvelle_description = input("Nouvelle description de l'annonce : ").strip()
            nouveau_prix = float(input("Nouveau prix (en euros) : ").strip())
            nouvelle_adresse = input("Nouvelle adresse du bien immobilier : ").strip()
            nouvelles_photos = input("Entrez les nouvelles URLs des photos, séparées par des virgules : ").strip().split(',')
            print(modifier_annonce(id_annonce, email_user, nouveau_titre, nouvelle_description, nouveau_prix, nouvelle_adresse, nouvelles_photos))
        elif action == "supprimer":
            id_annonce = input("Entrez l'ID de l'annonce à supprimer : ").strip()
            email_user = input("Entrez votre email : ").strip()
            print(supprimer_annonce(id_annonce, email_user))
        else:
            print("Action invalide.")
    else:
        print("Choix invalide.")

except ConnectionFailure as e:
    print("Échec de la connexion à MongoDB :", e)
except Exception as e:
    print("Une erreur s'est produite :", e)
finally:
    client.close()
