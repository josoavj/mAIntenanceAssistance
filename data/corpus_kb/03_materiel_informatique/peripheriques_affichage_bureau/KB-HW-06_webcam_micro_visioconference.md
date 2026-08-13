# ID: KB-HW-06
# Titre: Webcam ou microphone non fonctionnel en visioconference
# Catégorie: Materiel informatique - Peripheriques d'affichage et de bureau

## Symptômes

- L'application de visioconference (ex : Microsoft Teams, Zoom, Google Meet) n'affiche aucune image de la webcam ou signale "Camera introuvable".
- Les interlocuteurs signalent ne pas entendre l'utilisateur, ou l'utilisateur n'entend pas le son des autres participants.
- La webcam ou le microphone fonctionnait correctement lors d'une session precedente et ne fonctionne plus sans changement matériel apparent.
- Peripherique integre (portable) ou externe (webcam USB, casque) concerne.

## Étapes de résolution

1. **Vérifier que le peripherique correct est selectionne dans les parametres audio/video de l'application** de visioconference utilisee, cause la plus frequente en cas de changement recent de peripherique (ex : casque Bluetooth deconnecte, application revenue par défaut au micro integre).

2. **Vérifier les parametres de confidentialite du système d'exploitation** : autorisation d'accès a la camera et au microphone pour l'application concernee (Parametres > Confidentialite > Camera/Microphone sous Windows, ou Preferences Systeme > Sécurité et confidentialite sous macOS).

3. **Vérifier qu'aucune autre application n'utilise deja le peripherique** de maniere exclusive (une webcam ou un micro ne peuvent generalement etre utilises que par une seule application a la fois).

4. **Vérifier la connexion physique du peripherique** (câble USB, appairage Bluetooth) et tester sur un autre port si peripherique filaire externe.

5. **Vérifier l'etat du pilote dans le gestionnaire de périphériques** : presence d'un point d'exclamation indiquant une erreur de pilote, et mettre a jour ou reinstaller le pilote si nécessaire.

6. **Tester le peripherique dans un autre contexte** (enregistreur vocal du système pour le micro, application Camera native pour la webcam) afin de determiner si le probleme est specifique a l'application de visioconference ou plus general au système.

7. **Redemarrer l'application de visioconference, puis le poste**, ce qui resout une part significative des blocages logiciels transitoires lies aux périphériques audio/video.

## Conditions d'escalade

- Peripherique non detecte par le système d'exploitation lui-meme (absent du gestionnaire de périphériques) apres vérification des branchements : escalader vers le support matériel, panne physique probable du peripherique ou du port.
- Probleme touchant simultanement plusieurs utilisateurs sur une meme application de visioconference : escalader vers l'équipe applicative concernee, cause probable liee au service lui-meme plutot qu'aux postes individuels.
- Necessite d'un remplacement de peripherique (webcam, casque) suite a une panne materielle confirmee : escalader vers la gestion de parc pour attribution d'un nouveau matériel.
- Restriction de confidentialite imposee au niveau de la politique de gestion des postes (MDM) empechant l'accès camera/microphone : escalader vers l'équipe administration des postes pour vérifier la politique appliquee, hors perimetre de modification pour le support N1.
