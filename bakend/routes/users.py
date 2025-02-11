from flask import Blueprint, request, jsonify
from database import users_collection
from models.user_model import User

users_bp = Blueprint('users', __name__)

@users_bp.route("/register", methods=["POST"])
def register():
    data = request.json
    if users_collection.find_one({"email": data["email"]}):
        return jsonify({"error": "Cet email est déjà utilisé."}), 400

    if users_collection.find_one({"username": data["username"]}):
        return jsonify({"error": "Ce nom d'utilisateur est déjà pris."}), 400

    if data["password"] != data["confirm_password"]:
        return jsonify({"error": "Les mots de passe ne correspondent pas."}), 400

    user = User(data["email"], data["username"], data["password"], data["nom"], data["prenom"], data["adresse"])
    users_collection.insert_one(user.to_dict())
    return jsonify({"message": "Utilisateur inscrit avec succès !"})

@users_bp.route("/login", methods=["POST"])
def login():
    data = request.json
    user = users_collection.find_one({"email": data["email"]})
    if not user:
        return jsonify({"error": "Utilisateur non trouvé."}), 404

    if User.check_password(user["password"], data["password"]):
        return jsonify({"message": f"Connexion réussie ! Bienvenue, {user['prenom']} {user['nom']}."})
    else:
        return jsonify({"error": "Mot de passe incorrect."}), 401