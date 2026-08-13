# ID: KB-HW-08
# Titre: Port USB endommage ou non fonctionnel
# Catégorie: Matériel informatique - Postes de travail

## Symptômes

- Un peripherique branche sur un port USB specifique n'est pas detecte par le système, alors qu'il fonctionne sur un autre port ou un autre poste.
- Message système recurrent "Peripherique USB non reconnu" pour differents périphériques testes sur le meme port.
- Connexion instable necessitant de rebrancher plusieurs fois le câble pour obtenir une detection.
- Port USB visiblement endommage physiquement (connecteur casse, fissure, jeu excessif du connecteur).

## Étapes de résolution

1. **Confirmer que le probleme est bien localise au port et non au peripherique**, en testant plusieurs périphériques differents (cle USB, souris, câble de charge) sur le port suspecte, puis en testant le peripherique initial sur un autre port fonctionnel du meme poste.

2. **Vérifier l'etat du port dans le gestionnaire de périphériques** (section "Controleurs de bus USB") : presence d'un point d'exclamation ou d'un peripherique repertorie en erreur.

3. **Desinstaller puis reinstaller les pilotes de contrôleur USB** via le gestionnaire de périphériques (clic droit > Desinstaller le peripherique, puis redemarrage pour reinstallation automatique), une corruption de pilote pouvant simuler une panne physique.

4. **Vérifier les parametres d'economie d'energie USB**, une mise en veille selective du port pouvant provoquer une deconnexion intempestive (Gestionnaire de périphériques > Proprietes du concentrateur USB > Gestion de l'alimentation > decocher "Autoriser l'ordinateur a eteindre ce peripherique pour economiser de l'energie").

5. **Inspecter visuellement le port** pour detecter tout dommage physique (poussiere, corps etranger, connecteur deforme), sans tenter de nettoyage avec un objet metallique ou pointu.

6. **Si le probleme persiste apres verifications logicielles et qu'aucun dommage physique n'est visible**, tester sur un port USB d'un type different (ex : USB-A vs USB-C) si le poste en dispose, pour isoler davantage la cause.

## Conditions d'escalade

- Dommage physique confirme sur le connecteur (casse, deforme, jeu excessif) : escalader vers le support matériel N2 pour reparation ou remplacement, aucune intervention physique sur le connecteur ne doit etre tentee au niveau N1.
- Panne touchant l'ensemble des ports USB du poste simultanement, suggerant une défaillance du contrôleur USB integre a la carte mere : escalader vers le support matériel N2, intervention plus lourde probable.
- Le port defaillant est indispensable a l'activite immediate de l'utilisateur (ex : unique moyen de connexion d'un peripherique metier specifique) et aucune solution de contournement n'est disponible : escalader en priorité pour attribution d'un matériel de secours en attendant reparation.
- Poste sous garantie constructeur : escalader vers le prestataire de garantie plutot que d'engager une reparation interne.
