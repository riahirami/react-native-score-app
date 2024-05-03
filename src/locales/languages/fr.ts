/*
    src/locales/fr.ts
    this file contains all application french strings (actions, errors, messages ...)
*/

export const fr = {
  global: {
    locale: 'fr-FR',
    multiple_choice: 'Plusieurs choix possibles',
    empty_list: 'La liste est vide',
    yes: 'Oui',
    no: 'Non',
    placeholder: 'Type your text here',
  },
  session: {
    title: 'Session expirée',
    description: 'Votre session a expiré. Veuillez vous reconnecter !',
  },
  actions: {
    share: 'Partager',
    continue: 'Continuer',
    retry: 'Réessayer',
    quit: 'Quitter',
    ok: 'Ok',
    cancel: 'Annuler',
  },
  errors: {
    server: 'Une erreur est survenue, veuillez réessayer plus tard',
    network: 'Veuillez vérifier votre connexion internet',
    unknown_error: "Une erreur inconnue s'est produite",
  },
  validation: {
    error: 'Une erreur est survenue, veuillez réessayer plus tard',
  },
  popup: {
    confirm_text: 'Confirmer',
  },
};

export default fr;
export type TranslationsType = typeof fr;
