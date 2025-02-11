import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import StandardScaler
import joblib

# ===== 1. Charger les datasets =====
train_data = pd.read_csv("train.csv")
test_data = pd.read_csv("test.csv")

# Assurez-vous d'utiliser la bonne colonne pour la localisation
train_data["localisation"] = train_data["Neighborhood"].astype("category").cat.codes
test_data["localisation"] = test_data["Neighborhood"].astype("category").cat.codes

# ===== 2. Prétraitement des données =====
# Définir les caractéristiques (X) et la cible (y)
X_train_full = train_data[["LotArea", "BedroomAbvGr", "localisation"]]  # Exemple de colonnes pertinentes
y_train_full = train_data["SalePrice"]

# Normaliser les données
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train_full)
X_test_scaled = scaler.transform(test_data[["LotArea", "BedroomAbvGr", "localisation"]])

# ===== 3. Diviser les données pour validation =====
X_train, X_val, y_train, y_val = train_test_split(X_train_scaled, y_train_full, test_size=0.2, random_state=42)

# ===== 4. Entraîner le modèle =====
model = LinearRegression()
model.fit(X_train, y_train)

# ===== 5. Évaluer le modèle =====
val_score = model.score(X_val, y_val)
print(f"Score de validation : {val_score:.4f}")

# ===== 6. Faire des prédictions =====
test_predictions = model.predict(X_test_scaled)

# ===== 7. Sauvegarder les prédictions =====
sample_submission = pd.read_csv("sample_submission.csv")
sample_submission["SalePrice"] = test_predictions
sample_submission.to_csv("submission.csv", index=False)

# ===== 8. Sauvegarder le modèle =====
joblib.dump(model, "price_model.pkl")
joblib.dump(scaler, "scaler.pkl")
