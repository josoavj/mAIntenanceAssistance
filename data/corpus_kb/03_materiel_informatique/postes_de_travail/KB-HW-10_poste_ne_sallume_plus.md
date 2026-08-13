# ID: KB-HW-10
# Titre: Poste ne s'allumant plus (absence totale de demarrage)
# Catégorie: Matériel informatique - Postes de travail

## Symptômes

- Aucune reaction du poste a l'appui sur le bouton d'alimentation : ni voyant lumineux, ni son de ventilateur, ni affichage.
- Voyants d'alimentation actifs mais ecran restant noir en permanence, sans affichage du logo constructeur au demarrage.
- Demarrage puis extinction immédiate et répétée (redémarrage en boucle sans jamais atteindre le système d'exploitation).
- Cas survenu après un evenement identifiable (coupure de courant, choc physique, liquide renverse) ou sans cause apparente.

## Étapes de résolution

1. **Etablir en priorité si un liquide a été renverse sur le poste** : dans ce cas, ne pas tenter de redemarrer l'appareil, le debrancher immédiatement de toute alimentation, retirer la batterie si demontable, et traiter comme une panne matérielle confirmee nécessitant une intervention specialisee, tout redémarrage risquant de provoquer un court-circuit et d'aggraver les dommages.

2. **Pour un poste de bureau, vérifier l'alimentation électrique en amont** : prise fonctionnelle testee avec un autre appareil, interrupteur du bloc d'alimentation en position marche, câble d'alimentation teste avec un câble de rechange connu fonctionnel.

3. **Pour un ordinateur portable, vérifier le chargeur** : voyant de charge actif, test avec un chargeur de rechange identique connu fonctionnel si disponible, connecteur de charge non endommagé.

4. **Tenter une réinitialisation matérielle (hard reset)** : debrancher toute alimentation, retirer la batterie si demontable, maintenir le bouton d'alimentation enfonce pendant 15 a 30 secondes pour decharger les condensateurs residuels, puis reconnecter l'alimentation et retenter un demarrage.

5. **Si des voyants s'allument mais l'ecran reste noir**, vérifier via une sortie video externe (HDMI/USB-C) si le poste est un portable, pour distinguer une panne d'ecran d'une panne plus profonde (carte mere, mémoire).

6. **Ecouter et noter tout signal sonore emis au demarrage (codes bip du BIOS/UEFI)**, ces sequences sonores standardisees selon le constructeur permettent souvent d'identifier precisement le composant en cause (mémoire, carte graphique, carte mere).

7. **Documenter precisement l'ensemble des observations** (voyants actifs ou non, sons entendus, comportement exact) dans le ticket, ces informations etant essentielles pour orienter l'intervention matérielle a venir.

## Conditions d'escalade

- Absence totale de reaction du poste malgré vérification de l'alimentation et réinitialisation matérielle : escalader vers le support matériel N2, panne probable de l'alimentation interne ou de la carte mere nécessitant une intervention physique.
- Suspicion de dommage lie a un liquide renverse : escalader immédiatement vers le support matériel N2, intervention specialisee nécessaire, ne pas tenter de secher ou reactiver l'appareil au niveau N1.
- Poste sous garantie constructeur : escalader vers le prestataire de garantie plutôt que d'engager un demontage interne qui pourrait annuler la couverture.
- Donnees non sauvegardees jugees critiques presentes sur le poste et disque potentiellement encore fonctionnel malgré la panne d'allumage : escalader vers le support N2 en precisant ce point, pour envisager une extraction du disque avant toute intervention destructive.
