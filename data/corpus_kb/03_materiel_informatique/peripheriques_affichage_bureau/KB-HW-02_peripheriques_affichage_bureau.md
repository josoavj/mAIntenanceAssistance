# ID: KB-HW-02
# Titre: Panne des périphériques d'affichage et de bureau
# Catégorie: Matériel informatique - Périphériques d'affichage et de bureau

## Symptômes

- Ecran externe indiquant "Aucun signal" ou restant noir alors que le poste est allume.
- Station d'accueil (dock) non reconnue par le système d'exploitation, ou périphériques connectes a la station non fonctionnels.
- Souris ou clavier filaire/sans fil ne repondant plus, partiellement ou totalement.

## Étapes de résolution

1. **Cas ecran externe sans signal :**
   - Vérifier le branchement du câble video (HDMI, DisplayPort, USB-C) aux deux extremites.
   - Tester un câble ou un port différent pour ecarter un défaut de câble ou de port.
   - Vérifier la source d'entree selectionnee sur l'ecran lui-même via son menu physique.
   - Forcer la detection d'affichage sur le poste (raccourci système, ex : touche Windows + P sous Windows) pour vérifier si le signal est emis mais non affiché.

2. **Cas station d'accueil non reconnue :**
   - Vérifier que la station est bien alimentee (voyant d'alimentation actif).
   - Debrancher et rebrancher le câble de liaison poste-station (USB-C ou proprietaire).
   - Vérifier la presence et la mise a jour du pilote de la station d'accueil dans le gestionnaire de périphériques.
   - Tester la station avec un autre poste si disponible, pour distinguer une panne de la station d'une incompatibilite avec le poste concerne.

3. **Cas souris ou clavier defectueux :**
   - Filaire : tester sur un autre port USB, vérifier le câble.
   - Sans fil : vérifier le niveau de la pile/batterie, vérifier la presence du recepteur USB ou l'appairage Bluetooth, retenter l'appairage si nécessaire.
   - Tester le peripherique sur un autre poste si possible pour confirmer la panne matérielle plutôt qu'une cause logicielle.

4. **Proposer un peripherique de remplacement temporaire** issu du stock de matériel de secours si disponible, en attendant le remplacement definitif.

5. **Consigner la reference du peripherique defectueux** (modele, numero d'inventaire si applicable) dans le ticket.

## Conditions d'escalade

- Panne confirmee sur un équipement sous garantie ou sous contrat de maintenance avec un prestataire externe : escalader vers ce prestataire selon la procedure de gestion de parc.
- Plusieurs pannes similaires signalees sur le même modele de peripherique dans un court intervalle : escalader vers le support N2 matériel pour investigation d'un défaut de serie potentiel.
- Absence de matériel de remplacement en stock alors que l'utilisateur est bloque dans son activite : escalader vers le responsable de la gestion de parc pour arbitrage de priorité.
- Panne persistant après remplacement complet du peripherique, suspicion d'une cause liée au poste lui-même (port defectueux, pilote système) : escalader vers KB-HW-01 ou le support N2 poste de travail.
