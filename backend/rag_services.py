# rag_service.py
import chromadb
from chromadb.utils import embedding_functions

embedding_fn = embedding_functions.DefaultEmbeddingFunction()
chroma_client = chromadb.PersistentClient(path="./chroma_db")
collection = chroma_client.get_collection(
    name="kb_documents",
    embedding_function=embedding_fn
)

def chercher_dans_kb(query: str, top_k: int = 2):
    results = collection.query(
        query_texts=[query],
        n_results=top_k
    )

    contexte_passages = []
    sources = []

    if results["documents"] and results["documents"][0]:
        for doc, meta in zip(results["documents"][0], results["metadatas"][0]):
            doc_id = meta["doc_id"]
            sources.append(doc_id)
            contexte_passages.append(f"--- SOURCE [{doc_id}] ---\n{doc}")

    contexte_texte = "\n\n".join(contexte_passages) if contexte_passages else "AUCUNE PROCEDURE TROUVÉE."

    return {
        "contexte": contexte_texte,
        "sources": sources,
        "trouve": len(sources) > 0
    }