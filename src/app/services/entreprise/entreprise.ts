import { Injectable } from '@angular/core';
import {EntrepriseControllerService, EntrepriseResponseDto} from '../../../gs-api/src';
import {EntrepriseRequestDto} from '../../../gs-api/src/model/entrepriseRequestDto';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Entreprise {
  constructor(
    private entrepriseService: EntrepriseControllerService
  ) {

  }

  sincrire(entreprise: EntrepriseRequestDto): Observable<EntrepriseResponseDto>{
    return this.entrepriseService.save5(entreprise.nomEntreprise, entreprise.description, entreprise.email, entreprise.codeFiscal,
    entreprise.numTel, entreprise.adresse.codePostal, entreprise.adresse.pays, entreprise.adresse.adresse1, entreprise.adresse.adresse2,
      entreprise.adresse.ville, entreprise.adresse.pays)
  }
}
