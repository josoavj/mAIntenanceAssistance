# ID: KB-HW-03
# Titre: Panne des équipements réseau locaux
# Catégorie: Materiel informatique - Equipements réseau locaux

## Symptômes

- Boitier mural RJ45 endommagé ou ne fournissant plus de connexion (voyant du port poste éteint malgré un câble fonctionnel).
- Point d'accès Wi-Fi de bureau ne diffusant plus de réseau, ou diffusant un réseau instable (déconnexions fréquentes des utilisateurs a proximité).
- Switch local en panne, provoquant une perte de connexion pour l'ensemble des postes qui y sont raccordés.

## Étapes de résolution

1. **Déterminer le périmètre d'impact** : un seul poste (suspicion prise murale), une zone géographique limitée (suspicion point d'accès Wi-Fi), ou un ensemble de postes cables sur un même équipement (suspicion switch).

2. **Cas prise murale RJ45 :**
   - Tester avec un câble réseau connu fonctionnel sur la même prise.
   - Tester le câble initial sur une autre prise fonctionnelle, pour isoler la cause entre le câble et la prise.
   - Vérifier visuellement l'état physique de la prise (connecteurs endommagés, prise descellée).

3. **Cas point d'accès Wi-Fi de bureau :**
   - Vérifier l'alimentation de l'équipement (voyants d'état, alimentation PoE le cas échéant).
   - Consulter la console de gestion Wi-Fi centralisée (ex : contrôleur Wi-Fi, Cisco Meraki, Aruba, Unifi) pour vérifier l'état de l'équipement a distance.
   - Si l'équipement apparaît hors ligne dans la console, tenter un redémarrage a distance si la fonctionnalité est disponible.

4. **Cas switch local en panne :**
   - Vérifier l'alimentation et les voyants d'état du switch.
   - Consulter la console de supervision réseau pour confirmer la perte de l'équipement et identifier le nombre de postes impactés.
   - Ne pas redemarrer un switch de production sans validation préalable si d'autres services critiques y sont raccordés (ex : téléphonie IP, caméras de sécurité).

5. **Consigner la localisation précise de l'équipement** (bâtiment, étage, salle, identifiant d'inventaire) dans le ticket pour faciliter une intervention terrain.

6. **Si le problème est résolu par une action a distance**, confirmer le rétablissement avec les utilisateurs impactés avant clôture.

## Conditions d'escalade

- Panne d'un switch local impactant plusieurs postes ou services critiques : escalader immédiatement vers l'équipe infrastructure réseau, intervention terrain généralement nécessaire.
- Prise murale ou câblage endommagé nécessitant une intervention physique sur l'infrastructure bâtiment : escalader vers l'équipe technique bâtiment ou le prestataire de câblage.
- Point d'accès Wi-Fi injoignable même depuis la console de gestion centralisée : escalader vers l'équipe infrastructure réseau pour intervention terrain (remplacement ou réinitialisation physique).
- Suspicion de panne liée a une surcharge électrique ou un problème d'alimentation PoE affectant plusieurs équipements simultanément : escalader en priorité élevée vers l'équipe infrastructure, risque d'impact étendu.
