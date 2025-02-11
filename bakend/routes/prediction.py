from flask import Blueprint, request, jsonify
import joblib
import numpy as np
from database import annonces_collection

prediction_bp = Blueprint("prediction", __name__)

# Charger le modèle, le scaler et l'encodage des localisations
model = joblib.load("price_model.pkl")
scaler = joblib.load("scaler.pkl")
localisation_mapping = {"Paris": 1, "Lyon": 2, "Marseille": 3}
joblib.dump(localisation_mapping, "localisation_mapping.pkl")
#localisation_mapping = joblib.load("localisation_mapping.pkl")
  # Nouveau await 

@prediction_bp.route("/predict_price", methods=["POST"])
def predict_price():
    """Prédit le prix d'un bien immobilier."""
    try:
        # Récupérer les données JSON de la requête
        data = request.json
        surface = data.get("surface")
        nombre_chambres = data.get("nombre_chambres")
        localisation = data.get("localisation")

        # Vérifier que toutes les données sont présentes
        if surface is None or nombre_chambres is None or localisation is None:
            return jsonify({"error": "Données manquantes"}), 400

        # Vérifier que les données numériques sont valides
        try:
            surface = float(surface)
            nombre_chambres = int(nombre_chambres)
        except ValueError:
            return jsonify({"error": "Surface ou nombre de chambres invalide"}), 400

        # Encoder la localisation
        localisation_code = localisation_mapping.get(localisation, -1)
        if localisation_code == -1:
            return jsonify({"error": "Localisation inconnue"}), 400

        # Transformer les données d'entrée
        input_data = np.array([[surface, nombre_chambres, localisation_code]])
        input_scaled = scaler.transform(input_data)

        # Prédire le pri
        predicted_price = model.predict(input_scaled)[0]

        # Retourner la réponse
        return jsonify({"predicted_price": round(predicted_price, 2)})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
