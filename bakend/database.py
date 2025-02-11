from pymongo import MongoClient
from config import MONGO_URI

client = MongoClient(MONGO_URI)
db = client['projetmobile2']

# Collections
users_collection = db['users']
annonces_collection = db['annonces']