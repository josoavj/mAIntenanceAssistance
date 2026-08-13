# ID: KB-NET-04
# Titre: Conflit d'adresse IP
# Catégorie: Réseau et connectivité

## Symptômes

- Message système explicite : "Une adresse IP identique a celle de ce poste est déjà utilisee sur le réseau" (Windows) ou équivalent.
- Perte intermittente de la connexion réseau, avec rétablissement spontane après quelques minutes.
- Deux postes ou plus sur le même réseau signalent des symptomes similaires au même moment.

## Étapes de résolution

1. **Confirmer le conflit** via le message système exact ou via la commande `arp -a` (Windows/Linux) pour identifier l'adresse MAC associee a l'adresse IP en conflit.

2. **Vérifier le mode d'attribution de l'adresse IP du poste** : DHCP (majorite des cas en environnement d'entreprise) ou adresse IP fixe configuree manuellement.

3. **Si le poste est configure en IP fixe :**
   - Vérifier aupres de l'équipe réseau si cette adresse fixe est bien reservee et documentee dans le plan d'adressage.
   - Une IP fixe non documentee et attribuée par erreur a deux postes distincts est une cause frequente de ce type d'incident.

4. **Si le poste est en DHCP**, forcer le renouvellement du bail via `ipconfig /release` puis `ipconfig /renew` (Windows), ce qui suffit généralement a resoudre un conflit transitoire lie a un bail DHCP mal libere.

5. **Vérifier si un équipement non autorise ou mal configure** (ex : poste reintroduit sur le réseau avec une ancienne configuration IP fixe, matériel personnel connecté par erreur) est a l'origine du conflit, en croisant l'adresse MAC identifiee avec l'inventaire du parc.

6. **Documenter l'adresse IP et l'adresse MAC des deux équipements en conflit** dans le ticket pour faciliter l'investigation en cas de recurrence.

## Conditions d'escalade

- Conflit recurrent malgré le renouvellement DHCP, suggerant une mauvaise configuration de la plage d'adresses ou du serveur DHCP lui-même : escalader vers l'équipe infrastructure réseau.
- L'équipement identifié en conflit n'est pas reference dans l'inventaire du parc informatique : escalader vers l'équipe sécurité réseau, possible presence d'un équipement non autorise sur le réseau (matériel personnel, équipement inconnu).
- Conflits multiples et simultanes touchant plusieurs postes sur le même segment réseau : escalader immédiatement vers l'infrastructure réseau, cause probable au niveau du serveur DHCP ou du plan d'adressage.
- Conflit implicant un serveur ou un équipement critique en adressage fixe : escalader en priorité élevée vers l'infrastructure, ne pas modifier la configuration sans validation préalable.
