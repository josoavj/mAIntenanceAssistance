# ID: KB-SEC-05
# Titre: Cle USB ou peripherique inconnu decouvert
# Catégorie: Cybersécurité

## Symptômes

- Un utilisateur signale avoir trouve une cle USB ou un autre support amovible dans les locaux de l'entreprise (parking, salle de reunion, reception) sans proprietaire identifiable.
- Un utilisateur a déjà connecté le peripherique inconnu a son poste avant de signaler la decouverte.
- Le peripherique a été reçu par courrier ou laisse volontairement de manière suspecte (technique connue d'ingenierie sociale dite du "USB drop attack").

## Étapes de résolution

1. **Consigner immédiatement l'information transmise par l'utilisateur** : circonstances de la decouverte, description physique du peripherique, et surtout si celui-ci a déjà été connecté a un poste.

2. **Si le peripherique n'a pas encore été connecté a un poste**, instruire clairement l'utilisateur de ne pas le faire et de le remettre au support informatique pour analyse, sans exception même par curiosite légitime.

3. **Si le peripherique a déjà été connecté a un poste :**
   - Traiter le poste concerne comme potentiellement compromis, en appliquant la procedure d'isolement decrite dans KB-SEC-03, même en l'absence d'alerte visible de l'antivirus/EDR a ce stade.
   - Ne jamais reconnecter le peripherique a un autre poste pour "vérifier" son contenu, y compris a des fins d'investigation informelle.

4. **Transmettre le peripherique physique a l'équipe sécurité** pour analyse en environnement isolé et contrôle (sandbox physique dédiée), jamais sur un poste de production standard.

5. **Sensibiliser l'utilisateur** sur les risques associes a la connexion de périphériques USB d'origine inconnue, cette pratique restant un vecteur d'attaque frequent et documente en environnement professionnel.

## Conditions d'escalade

- Ce type de decouverte doit systématiquement être transmis au SOC pour analyse, quel que soit le contexte apparent : le support N1 ne doit jamais tenter d'analyser lui-même le contenu du peripherique sur un poste standard.
- Le peripherique a déjà été connecté a un poste ayant accès a des systemes ou données sensibles : escalader en priorité élevée, le périmètre d'investigation potentiel est plus large.
- Decouverte répétée de plusieurs périphériques inconnus dans un même laps de temps ou un même lieu : signaler egalement a l'équipe sécurité physique, indice possible d'une tentative d'intrusion cibleee et organisée.
- Le peripherique presente des signes physiques suspects (etiquette trompeuse imitant une marque connue, dispositif visiblement modifie) : traiter comme une menace confirmee et escalader immédiatement sans manipulation supplementaire.
