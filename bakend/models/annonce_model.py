from datetime import datetime, timezone

class Annonce:
    def __init__(self, email_vendeur, type_annonce, titre, description, prix, adresse, photos=[]):
        self.email_vendeur = email_vendeur
        self.type_annonce = type_annonce
        self.titre = titre
        self.description = description
        self.prix = float(prix)
        self.adresse = adresse
        self.date_creation = datetime.now(timezone.utc)
        self.photos = photos

    def to_dict(self):
        return {
            "email_vendeur": self.email_vendeur,
            "type_annonce": self.type_annonce,
            "titre": self.titre,
            "description": self.description,
            "prix": self.prix,
            "adresse": self.adresse,
            "date_creation": self.date_creation.strftime('%Y-%m-%d %H:%M:%S'),
            "photos": self.photos,
        }
