# ID: KB-NET-04
# Titre: Conflit d'adresse IP
# Catégorie: Reseau et connectivité

## Symptômes

- Message système explicite : "Une adresse IP identique a celle de ce poste est deja utilisee sur le réseau" (Windows) ou equivalent.
- Perte intermittente de la connexion réseau, avec retablissement spontane apres quelques minutes.
- Deux postes ou plus sur le meme réseau signalent des symptomes similaires au meme moment.

## Étapes de résolution

1. **Confirmer le conflit** via le message système exact ou via la commande `arp -a` (Windows/Linux) pour identifier l'adresse MAC associee a l'adresse IP en conflit.

2. **Vérifier le mode d'attribution de l'adresse IP du poste** : DHCP (majorite des cas en environnement d'entreprise) ou adresse IP fixe configuree manuellement.

3. **Si le poste est configure en IP fixe :**
   - Vérifier aupres de l'équipe réseau si cette adresse fixe est bien reservee et documentee dans le plan d'adressage.
   - Une IP fixe non documentee et attribuee par erreur a deux postes distincts est une cause frequente de ce type d'incident.

4. **Si le poste est en DHCP**, forcer le renouvellement du bail via `ipconfig /release` puis `ipconfig /renew` (Windows), ce qui suffit generalement a resoudre un conflit transitoire lie a un bail DHCP mal libere.

5. **Vérifier si un equipement non autorise ou mal configure** (ex : poste reintroduit sur le réseau avec une ancienne configuration IP fixe, matériel personnel connecte par erreur) est a l'origine du conflit, en croisant l'adresse MAC identifiee avec l'inventaire du parc.

6. **Documenter l'adresse IP et l'adresse MAC des deux equipements en conflit** dans le ticket pour faciliter l'investigation en cas de recurrence.

## Conditions d'escalade

- Conflit recurrent malgre le renouvellement DHCP, suggerant une mauvaise configuration de la plage d'adresses ou du serveur DHCP lui-meme : escalader vers l'équipe infrastructure réseau.
- L'equipement identifie en conflit n'est pas reference dans l'inventaire du parc informatique : escalader vers l'équipe sécurité réseau, possible presence d'un equipement non autorise sur le réseau (matériel personnel, equipement inconnu).
- Conflits multiples et simultanes touchant plusieurs postes sur le meme segment réseau : escalader immédiatement vers l'infrastructure réseau, cause probable au niveau du serveur DHCP ou du plan d'adressage.
- Conflit implicant un serveur ou un equipement critique en adressage fixe : escalader en priorité elevee vers l'infrastructure, ne pas modifier la configuration sans validation prealable.
