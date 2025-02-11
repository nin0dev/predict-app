from flask import Flask
from flask_cors import CORS  # type: ignore
from routes.users import users_bp
from routes.annonces import annonces_bp
from routes.prediction import prediction_bp  # Corrected name: prediction_bp

# Initialize the Flask application *FIRST*
app = Flask(__name__)
CORS(app)  # Allow CORS requests

# Register the routes (Blueprints) *AFTER* app is created
app.register_blueprint(users_bp)
app.register_blueprint(annonces_bp)
app.register_blueprint(prediction_bp)  # Use the corrected name

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)