# ID: KB-HW-01
# Titre: Panne de poste de travail (ordinateur portable ou de bureau)
# Catégorie: Matériel informatique - Postes de travail

## Symptômes

- Ecran noir au demarrage ou en cours d'utilisation, sans reaction aux entrees clavier/souris.
- Batterie ne se chargeant plus, se dechargeant anormalement vite, ou poste ne demarrant plus sur batterie.
- Surchauffe constatee (chassis ou clavier anormalement chaud, poste qui s'eteint seul apres un usage prolonge).
- Ventilateur anormalement bruyant en permanence ou a l'arret complet.
- Clavier ou trackpad ne repondant plus, partiellement ou totalement.

## Étapes de résolution

1. **Identifier le symptome precis et son contexte d'apparition** (au demarrage, apres une mise a jour, apres un choc physique, progressivement dans le temps).

2. **Cas ecran noir :**
   - Vérifier l'alimentation electrique (voyant de charge, câble branche) et tenter un redemarrage force (maintien du bouton d'alimentation 10 secondes).
   - Si le poste demarre mais l'ecran reste noir, tester la sortie video externe (HDMI/USB-C) pour distinguer une panne d'ecran d'une panne de carte graphique ou de carte mere.

3. **Cas batterie defectueuse :**
   - Vérifier l'etat de sante de la batterie via l'outil du système d'exploitation ou du constructeur (ex : rapport `powercfg /batteryreport` sous Windows).
   - Tester le fonctionnement sur secteur, adaptateur debranche puis rebranche, pour ecarter un probleme de câble ou de chargeur.

4. **Cas surchauffe / ventilateur bruyant :**
   - Vérifier que les grilles d'aeration ne sont pas obstruees (poussiere, poste utilise sur une surface molle).
   - Consulter les temperatures via l'outil de diagnostic matériel disponible (ex : outil constructeur type Dell SupportAssist, HP Support Assistant, ou utilitaire BIOS).
   - Recommander un nettoyage physique par un technicien si le poste est en garantie ou proche du parc (aucun demontage par l'utilisateur ou a distance).

5. **Cas clavier/trackpad hors service :**
   - Ecarter une cause logicielle : vérifier les pilotes dans le gestionnaire de périphériques, tester apres redemarrage.
   - Si clavier/trackpad externe temporaire disponible, le proposer en solution palliative en attendant intervention materielle.

6. **Consigner le numero de serie et le modele du poste** dans le ticket pour faciliter une eventuelle prise en charge garantie ou echange standard.

7. **Si le diagnostic conclut a une panne materielle confirmee**, planifier le remplacement ou la reparation selon la procedure de gestion de parc en vigueur (pret de matériel de secours si disponible).

## Conditions d'escalade

- Panne materielle confirmee necessitant une intervention physique (ouverture du chassis, remplacement de composant) : escalader vers l'équipe support matériel N2 ou le prestataire de maintenance sous garantie.
- Surchauffe accompagnee d'une odeur inhabituelle, de fumee, ou de deformation visible du chassis ou de la batterie : arreter immédiatement l'utilisation du poste, ne pas tenter de redemarrage, et escalader en priorité critique vers l'équipe sécurité des biens/HSE en plus du support matériel, risque d'incident physique.
- Poste sous garantie constructeur : escalader vers le prestataire de garantie plutot que d'engager une intervention interne.
- Symptome recurrent malgre remplacement d'un composant (ex : nouvelle batterie presentant le meme défaut) : escalader vers le support N2 pour investigation approfondie, cause possible non identifiee (alimentation, carte mere).
