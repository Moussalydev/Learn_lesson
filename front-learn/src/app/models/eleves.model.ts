export class Eleve {
    constructor(
      public matricule: string,
      public prenom: string,
      public nom: string,
      public date_naissance: Date,
      public lieu_naissance: string,
      public niveau: string,
    ) {}
  }