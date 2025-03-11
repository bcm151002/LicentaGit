export interface DatePersonale {
  id_datepersonale: number;
  adresa: string;
  dataNastere: Date; // or Date if the backend returns a date in a compatible format
  fotografie: string | ArrayBuffer; // depends on how you're sending the image data
  localitate: string;
  localitateNastere: string;
  numarTelefon: string;
  nume: string;
  prenume: string;
  id_user: number;
}

export interface DateScolarizare {
  id_datescolarizare: number;
  formaFinantare: string;
  grupa: string;
  id_facultate: number;
  promotie: string;
  specializare: string;
  id_user: number;
}
