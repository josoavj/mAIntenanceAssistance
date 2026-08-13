# ID: KB-SEC-04
# Titre: Perte ou vol d'un équipement professionnel
# Catégorie: Cybersécurité

## Symptômes

- L'utilisateur signale la perte ou le vol de son ordinateur portable, telephone professionnel, ou tout autre équipement contenant des données ou des accès professionnels.
- Signalement effectue avec un delai variable après l'evenement (immediat ou differe, ex : constat au reveil après un vol nocturne).
- Circonstances variables : vol caracterise (effraction, vol a l'arrache), perte simple (oubli dans un lieu public, un transport), ou incertitude sur la nature exacte de l'evenement.

## Étapes de résolution

1. **Traiter la demande en priorité immédiate**, independamment de l'heure de reception, ce type d'incident ne doit jamais attendre un traitement differe.

2. **Recueillir les informations essentielles aupres de l'utilisateur** : type d'équipement, circonstances et heure approximative de la perte/du vol, lieu, et si un depot de plainte a déjà été effectue ou est prevu.

3. **Verrouiller ou effacer l'équipement a distance immédiatement** via l'outil de gestion de flotte (ex : Microsoft Intune, Jamf, solution MDM equivalente) :
   - Declencher un verrouillage a distance (remote lock) en priorité si l'appareil est susceptible d'être encore sous tension et connecté.
   - Envisager un effacement a distance (remote wipe) selon la sensibilite des données stockees localement et la politique de sécurité en vigueur, après validation si nécessaire aupres du SOC.

4. **Revoquer immédiatement l'ensemble des sessions et jetons d'authentification** associes aux comptes utilisateur potentiellement accessibles depuis l'appareil perdu (messagerie, VPN, applications SaaS synchronisees).

5. **Forcer un changement de mot de passe** du compte principal de l'utilisateur par precaution, même si l'appareil etait protege par un code de verrouillage local.

6. **Vérifier le chiffrement de disque de l'équipement perdu** (ex : BitLocker sous Windows, FileVault sous macOS) dans l'inventaire de parc, information determinante pour evaluer le niveau de risque reel de fuite de données.

7. **Documenter precisement l'incident** (équipement, données potentiellement exposees, actions de sécurité realisees et horodatage) pour les besoins d'une eventuelle notification reglementaire.

## Conditions d'escalade

- Ce type d'incident doit systématiquement être escalade vers le SOC et le responsable de la sécurité des systemes d'information, quel que soit le niveau de sensibilite apparent des données : le support N1 ne doit jamais cloturer seul ce type de ticket.
- Equipement non chiffre contenant potentiellement des données personnelles ou sensibles : escalader en priorité absolue vers le delegue a la protection des données (DPO), un delai reglementaire de notification peut s'appliquer selon la reglementation en vigueur.
- Equipement appartenant a un cadre dirigeant ou disposant d'accès a des informations strategiques ou confidentielles : escalader avec priorité maximale vers le SOC et la direction de la sécurité.
- Vol dans un contexte pouvant relever d'une action ciblee (vol uniquement de l'équipement professionnel parmi d'autres biens, circonstances suspectes) : signaler egalement a l'équipe sécurité physique/surete de l'organisation en complement du traitement informatique.
