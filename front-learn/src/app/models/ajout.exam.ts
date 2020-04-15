export class Examen {
    constructor(
      public subject: string,
      public semestre: string,
      public notedevoir:string,
      public dateExamen:Date,
      public note: number,
      
    ) {}
  }