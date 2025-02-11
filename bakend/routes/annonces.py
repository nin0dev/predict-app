from flask import Blueprint, request, jsonify
from database import annonces_collection, users_collection
from models.annonce_model import Annonce
from bson import ObjectId

annonces_bp = Blueprint('annonces', __name__)

@annonces_bp.route("/add_annonce", methods=["POST"])
def add_annonce():
    data = request.json
    user = users_collection.find_one({"email": data["email_user"]})
    if not user:
        return jsonify({"error": "Utilisateur non trouvé."}), 404

    annonce = Annonce(data["email_user"], data["type_annonce"], data["titre"], data["description"], data["prix"], data["adresse"], data.get("photos", []))
    annonces_collection.insert_one(annonce.to_dict())
    return jsonify({"message": "Annonce ajoutée avec succès !"})

@annonces_bp.route("/annonces", methods=["GET"])
def get_annonces():
    annonces = annonces_collection.find()
    result = [{"id": str(annonce["_id"]), **annonce} for annonce in annonces]
    return jsonify(result)

@annonces_bp.route("/delete_annonce/<annonce_id>", methods=["DELETE"])
def delete_annonce(annonce_id):
    result = annonces_collection.delete_one({"_id": ObjectId(annonce_id)})
    if result.deleted_count == 1:
        return jsonify({"message": "Annonce supprimée avec succès !"})
    return jsonify({"error": "Annonce introuvable."}), 404