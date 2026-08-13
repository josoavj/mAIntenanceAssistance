# ID: KB-OTH-01
# Titre: Demande non classable ou indeterminee
# Catégorie: Autre ou indéterminé

## Symptômes

- La demande formulee par l'utilisateur ne correspond a aucune categorie existante de la base de connaissances (Comptes et authentification, Reseau et connectivité, Materiel informatique, Logiciels et applications, Imprimantes et périphériques, Droits d'accès, Cybersecurite).
- La description fournie par l'utilisateur est trop vague, incomplete, ou ambigue pour permettre une qualification fiable, meme apres une premiere lecture.
- La demande combine plusieurs categories a la fois sans qu'il soit possible d'identifier une cause principale unique.

## Étapes de résolution

1. **Ne pas tenter de forcer un rattachement approximatif** a une categorie existante si les criteres de qualification ne sont pas clairement remplis : un classement errone degrade la qualite du traitement en aval.

2. **Reformuler la demande sous forme de questions fermees a l'utilisateur** pour clarifier le contexte : quel système ou outil est concerne, depuis quand le probleme est-il constate, quel message d'erreur exact est affiche le cas echeant, quelle action etait en cours au moment de l'incident.

3. **Si les elements complementaires permettent d'identifier une categorie existante**, reorienter la demande vers le document de base de connaissances correspondant et interrompre le traitement au titre de ce document.

4. **Si la demande reste non qualifiable malgre les clarifications obtenues**, consigner l'integralite des echanges dans le ticket avec un statut explicite "categorie indeterminee", sans forcer de résolution automatisee.

5. **Vérifier si la demande releve d'un besoin non technique** (question RH, demande administrative, demande materielle hors informatique) devant etre redirigee vers un autre service que le support IT.

## Conditions d'escalade

- Toute demande restant non qualifiable apres clarification doit etre transmise a un agent de support humain pour qualification manuelle : l'assistant ne doit jamais tenter de resoudre une demande dont la nature reelle n'est pas etablie avec un niveau de confiance suffisant.
- Demande exprimant une urgence explicite (blocage total d'activite, incident de sécurité potentiel non formellement identifiable) meme en l'absence de categorisation precise : escalader immédiatement en priorité elevee vers le support humain, la clarification ne doit pas retarder une prise en charge urgente.
- Demande contenant des elements pouvant relever d'un signalement RH, ethique, ou juridique (harcelement, fraude, conflit interne) evoques indirectement dans une demande technique : escalader immédiatement vers le canal approprie (RH, conformite) et ne pas traiter comme un incident IT standard.
- Toute ambiguite sur le fait qu'une demande puisse relever de la cybersecurite doit conduire par défaut vers une escalade de type sécurité (KB-SEC-02 ou KB-SEC-03) plutot qu'un classement en categorie indeterminee, par principe de precaution.
