import os
import re
import chromadb
from chromadb.utils import embedding_functions

# Initialisation du client ChromaDB persistant
embedding_fn = embedding_functions.DefaultEmbeddingFunction()
chroma_client = chromadb.PersistentClient(path="./chroma_db")
collection = chroma_client.get_or_create_collection(
    name="kb_documents", 
    embedding_function=embedding_fn
)

def charger_corpus_kb(kb_root_path="../data/corpus_kb"):
    if not os.path.exists(kb_root_path):
        print(f"Dossier introuvable : {kb_root_path}")
        return

    documents = []
    metadatas = []
    ids = []

    # os.walk permet de parcourir automatiquement tous les sous-dossiers
    for root, dirs, files in os.walk(kb_root_path):
        for filename in files:
            # On ignore le README.md global et on ne prend que les fichiers .md
            if filename.endswith(".md") and filename != "README.md":
                filepath = os.path.join(root, filename)
                
                # Extraction du doc_id (ex: "KB-AUTH-01" depuis "KB-AUTH-01_mot_de_passe_oublie.md")
                # On prend tout ce qui précède le premier underscore "_"
                doc_id = filename.split("_")[0].upper()
                
                # Récupération du nom du dossier parent comme catégorie par défaut
                nom_dossier_parent = os.path.basename(root)

                with open(filepath, "r", encoding="utf-8") as f:
                    contenu = f.read()

                # On injecte l'ID et la catégorie dans le texte pour maximiser la recherche sémantique
                texte_enrichi = f"DOCUMENT ID: {doc_id}\nCATEGORIE: {nom_dossier_parent}\nCONTENU:\n{contenu}"

                documents.append(texte_enrichi)
                metadatas.append({
                    "doc_id": doc_id,
                    "fichier": filename,
                    "categorie": nom_dossier_parent
                })
                ids.append(doc_id)

    if ids:
        # Enregistrement / Mises à jour dans ChromaDB
        collection.upsert(
            documents=documents,
            metadatas=metadatas,
            ids=ids
        )
        print(f" {len(ids)} fiches KB indexées avec succès dans ChromaDB !")
    else:
        print(" Aucune fiche .md trouvée.")

if __name__ == "__main__":
    charger_corpus_kb()
