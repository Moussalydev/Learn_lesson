export class Eleve {
    constructor(
      public matricule: string,
      public prenom: string,
      public nom: string,
      public dateNaissance: Date,
      public lieuNaissance: string,
      public niveau: string,
    ) {}
  }