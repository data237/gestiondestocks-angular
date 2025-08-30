import { Injectable } from '@angular/core';
import {UserService} from '../user/user';
import {
  ClientControllerService,
  ClientResponseDto,
  FournisseurControllerService,
  FournisseurResponseDto
} from '../../../gs-api/src';
import {ClientRequestDto} from '../../../gs-api/src/model/clientRequestDto';
import {Observable, of} from 'rxjs';
import {FournisseurRequestDto} from '../../../gs-api/src/model/fournisseurRequestDto';

@Injectable({
  providedIn: 'root'
})
export class Cltfrs {
  constructor(
    private userService: UserService,
    private clientService: ClientControllerService,
    private fournisseurService: FournisseurControllerService
  ) {
  }

  enregistrerClient(clientRequestDto: ClientRequestDto): Observable<ClientResponseDto>{
    clientRequestDto.entrepriseId = <number>this.userService.getConnectedUser().user?.entrepriseId
    return this.clientService.save8(clientRequestDto.nom, clientRequestDto.prenom,
      clientRequestDto.email,clientRequestDto.adresse.adresse1 , clientRequestDto.adresse.pays,
      clientRequestDto.adresse.codePostal, clientRequestDto.adresse.ville,
      clientRequestDto.numTel, clientRequestDto.entrepriseId,clientRequestDto.adresse.adresse2)

  }

  enregistrerFournisseur(fournisseurRequestDto: FournisseurRequestDto): Observable<FournisseurResponseDto>{
    fournisseurRequestDto.entrepriseId = <number>this.userService.getConnectedUser().user?.entrepriseId
    return this.fournisseurService.save4(fournisseurRequestDto.nom, fournisseurRequestDto.prenom,
      fournisseurRequestDto.email,  fournisseurRequestDto.adresse.adresse1,fournisseurRequestDto.adresse.pays ,
      fournisseurRequestDto.adresse.codePostal,fournisseurRequestDto.adresse.ville ,
      fournisseurRequestDto.numTel, fournisseurRequestDto.entrepriseId,fournisseurRequestDto.adresse.adresse2)

  }

  findAllClients(): Observable<Array<ClientResponseDto>>{
    return this.clientService.findAll8()
  }
  findAllFournisseurs(): Observable<Array<FournisseurResponseDto>>{
    return this.fournisseurService.findAll4()
  }

  findclientById(id: number): Observable<ClientResponseDto>{
    if(id){
      return this.clientService.findById8(id)
    }
    return of()
  }

  findfournisseurById(id: number): Observable<FournisseurResponseDto>{
    if(id){
      return this.fournisseurService.findById4(id)
    }
    return of()
  }


  deleteClient(idClient: number): Observable<any>{
    if(idClient){
      return this.clientService.delete8(idClient)
    }
    return of()
  }

  deleteFournisseur(idFournisseur: number): Observable<any>{
    if(idFournisseur){
      return this.fournisseurService.delete4(idFournisseur)
    }
    return of()
  }
}
