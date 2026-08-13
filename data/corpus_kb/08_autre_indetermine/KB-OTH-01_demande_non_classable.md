# ID: KB-OTH-01
# Titre: Demande non classable ou indeterminee
# Catégorie: Autre ou indéterminé

## Symptômes

- La demande formulee par l'utilisateur ne correspond a aucune catégorie existante de la base de connaissances (Comptes et authentification, Réseau et connectivité, Materiel informatique, Logiciels et applications, Imprimantes et périphériques, Droits d'accès, Cybersecurite).
- La description fournie par l'utilisateur est trop vague, incomplete, ou ambigue pour permettre une qualification fiable, même après une premiere lecture.
- La demande combine plusieurs categories a la fois sans qu'il soit possible d'identifier une cause principale unique.

## Étapes de résolution

1. **Ne pas tenter de forcer un rattachement approximatif** a une catégorie existante si les criteres de qualification ne sont pas clairement remplis : un classement errone degrade la qualite du traitement en aval.

2. **Reformuler la demande sous forme de questions fermees a l'utilisateur** pour clarifier le contexte : quel système ou outil est concerne, depuis quand le problème est-il constate, quel message d'erreur exact est affiché le cas échéant, quelle action etait en cours au moment de l'incident.

3. **Si les elements complementaires permettent d'identifier une catégorie existante**, reorienter la demande vers le document de base de connaissances correspondant et interrompre le traitement au titre de ce document.

4. **Si la demande reste non qualifiable malgré les clarifications obtenues**, consigner l'integralite des echanges dans le ticket avec un statut explicite "catégorie indeterminee", sans forcer de résolution automatisee.

5. **Vérifier si la demande releve d'un besoin non technique** (question RH, demande administrative, demande matérielle hors informatique) devant être redirigee vers un autre service que le support IT.

## Conditions d'escalade

- Toute demande restant non qualifiable après clarification doit être transmise a un agent de support humain pour qualification manuelle : l'assistant ne doit jamais tenter de resoudre une demande dont la nature réelle n'est pas etablie avec un niveau de confiance suffisant.
- Demande exprimant une urgence explicite (blocage total d'activite, incident de sécurité potentiel non formellement identifiable) même en l'absence de categorisation précise : escalader immédiatement en priorité élevée vers le support humain, la clarification ne doit pas retarder une prise en charge urgente.
- Demande contenant des elements pouvant relever d'un signalement RH, ethique, ou juridique (harcelement, fraude, conflit interne) evoques indirectement dans une demande technique : escalader immédiatement vers le canal approprie (RH, conformité) et ne pas traiter comme un incident IT standard.
- Toute ambiguite sur le fait qu'une demande puisse relever de la cybersecurite doit conduire par défaut vers une escalade de type sécurité (KB-SEC-02 ou KB-SEC-03) plutôt qu'un classement en catégorie indeterminee, par principe de precaution.
