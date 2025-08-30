import {AdresseRequestDto} from './adresseRequestDto';

export interface ClientRequestDto {
  nom: string,
  prenom: string,
 adresse: AdresseRequestDto,
  photo: string,
  email: string,
  numTel: string,
  entrepriseId: number
}
