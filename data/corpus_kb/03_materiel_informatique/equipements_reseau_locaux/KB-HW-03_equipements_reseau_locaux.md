# ID: KB-HW-03
# Titre: Panne des equipements réseau locaux
# Catégorie: Materiel informatique - Equipements réseau locaux

## Symptômes

- Boitier mural RJ45 endommage ou ne fournissant plus de connexion (voyant du port poste eteint malgre un câble fonctionnel).
- Point d'accès Wi-Fi de bureau ne diffusant plus de réseau, ou diffusant un réseau instable (deconnexions frequentes des utilisateurs a proximite).
- Switch local en panne, provoquant une perte de connexion pour l'ensemble des postes qui y sont raccordes.

## Étapes de résolution

1. **Determiner le perimetre d'impact** : un seul poste (suspicion prise murale), une zone geographique limitee (suspicion point d'accès Wi-Fi), ou un ensemble de postes cables sur un meme equipement (suspicion switch).

2. **Cas prise murale RJ45 :**
   - Tester avec un câble réseau connu fonctionnel sur la meme prise.
   - Tester le câble initial sur une autre prise fonctionnelle, pour isoler la cause entre le câble et la prise.
   - Vérifier visuellement l'etat physique de la prise (connecteurs endommages, prise descellee).

3. **Cas point d'accès Wi-Fi de bureau :**
   - Vérifier l'alimentation de l'equipement (voyants d'etat, alimentation PoE le cas echeant).
   - Consulter la console de gestion Wi-Fi centralisee (ex : contrôleur Wi-Fi, Cisco Meraki, Aruba, Unifi) pour vérifier l'etat de l'equipement a distance.
   - Si l'equipement apparait hors ligne dans la console, tenter un redemarrage a distance si la fonctionnalite est disponible.

4. **Cas switch local en panne :**
   - Vérifier l'alimentation et les voyants d'etat du switch.
   - Consulter la console de supervision réseau pour confirmer la perte de l'equipement et identifier le nombre de postes impactes.
   - Ne pas redemarrer un switch de production sans validation prealable si d'autres services critiques y sont raccordes (ex : telephonie IP, cameras de sécurité).

5. **Consigner la localisation precise de l'equipement** (batiment, etage, salle, identifiant d'inventaire) dans le ticket pour faciliter une intervention terrain.

6. **Si le probleme est resolu par une action a distance**, confirmer le retablissement avec les utilisateurs impactes avant clôture.

## Conditions d'escalade

- Panne d'un switch local impactant plusieurs postes ou services critiques : escalader immédiatement vers l'équipe infrastructure réseau, intervention terrain generalement nécessaire.
- Prise murale ou cablage endommage necessitant une intervention physique sur l'infrastructure batiment : escalader vers l'équipe technique batiment ou le prestataire de cablage.
- Point d'accès Wi-Fi injoignable meme depuis la console de gestion centralisee : escalader vers l'équipe infrastructure réseau pour intervention terrain (remplacement ou reinitialisation physique).
- Suspicion de panne liee a une surcharge electrique ou un probleme d'alimentation PoE affectant plusieurs equipements simultanement : escalader en priorité elevee vers l'équipe infrastructure, risque d'impact etendu.
