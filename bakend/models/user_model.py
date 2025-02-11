from werkzeug.security import generate_password_hash, check_password_hash

class User:
    def __init__(self, email, username, password, nom, prenom, adresse):
        self.email = email
        self.username = username
        self.password = generate_password_hash(password)
        self.nom = nom
        self.prenom = prenom
        self.adresse = adresse

    def to_dict(self):
        return {
            "email": self.email,
            "username": self.username,
            "password": self.password,
            "nom": self.nom,
            "prenom": self.prenom,
            "adresse": self.adresse,
        }

    @staticmethod
    def check_password(hashed_password, password):
        return check_password_hash(hashed_password, password)