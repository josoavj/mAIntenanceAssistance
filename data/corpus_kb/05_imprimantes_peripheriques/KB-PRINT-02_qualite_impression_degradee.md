# ID: KB-PRINT-02
# Titre: Qualite d'impression dégradée
# Catégorie: Imprimantes et périphériques

## Symptômes

- Traits ou bandes blanches horizontales visibles sur les documents imprimes.
- Couleurs incorrectes, delavees, ou dominante de couleur inattendue (ex : teinte rougeatre ou bleutee généralisée).
- Texte partiellement efface, flou, ou avec des zones de densite irregulieres.
- Taches d'encre/toner ou marques repetitives a intervalle regulier sur la page (signe frequent d'un tambour ou d'un rouleau defectueux).

## Étapes de résolution

1. **Identifier le type de défaut precis** a l'aide d'un exemple d'impression fourni par l'utilisateur ou reproduit a distance, la nature du défaut orientant directement le diagnostic.

2. **Vérifier le niveau des consommables** (encre ou toner) via le panneau de contrôle de l'imprimante ou la console d'administration a distance (ex : niveau affiché dans un serveur d'impression ou une solution de gestion de flotte).

3. **Cas de bandes ou traits reguliers :** lancer le cycle de nettoyage des tetes d'impression (imprimantes jet d'encre) via le menu de maintenance de l'imprimante, ou vérifier l'état du tambour/unite d'imagerie (imprimantes laser).

4. **Cas de couleurs incorrectes :** vérifier que les cartouches sont correctement inserees et non perimees, et lancer un alignement des couleurs via le menu de maintenance si l'option est disponible.

5. **Cas de marques repetitives a intervalle fixe :** mesurer l'espacement entre deux occurrences du défaut, cette information permet generalement d'identifier le composant en cause (tambour, rouleau de transfert, fusion) selon la documentation constructeur du modele concerne.

6. **Imprimer une page de test interne** (fonction generalement disponible depuis le menu de l'imprimante elle-même, independante du pilote et du poste) pour déterminer si le défaut provient de l'imprimante elle-même ou d'un problème de pilote/poste.

7. **Si le défaut n'apparaît pas sur la page de test interne mais uniquement sur les impressions depuis un poste**, vérifier et reinstaller si nécessaire le pilote d'impression sur le poste concerne.

## Conditions d'escalade

- Defaut confirmé sur la page de test interne de l'imprimante (independant du poste) et non résolu par le nettoyage ou le remplacement des consommables standards : escalader vers le prestataire de maintenance de l'imprimante, intervention technique probable (remplacement de pièce).
- Defaut apparaissant sur plusieurs imprimantes du même modele simultanément : escalader vers le support N2 matériel pour investigation d'un défaut de serie ou d'un lot de consommables defectueux.
- Imprimante sous contrat de maintenance avec un prestataire externe : orienter directement la demande vers ce prestataire selon les modalites contractuelles, plutôt que de multiplier les tentatives de diagnostic interne.
- Consommables (toner/encre) remplaces recemment et défaut apparu immédiatement apres ce remplacement : escalader vers le fournisseur des consommables pour vérification de la conformité du produit livre.
