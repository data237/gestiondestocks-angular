import {Component, EventEmitter, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ClientRequestDto} from '../../../gs-api/src/model/clientRequestDto';
import {AdresseRequestDto} from '../../../gs-api/src/model/adresseRequestDto';
import {FormsModule} from '@angular/forms';
import {Cltfrs} from '../../services/cltfrs/cltfrs';
import {ClientResponseDto, FournisseurResponseDto} from '../../../gs-api/src';
import {FournisseurRequestDto} from '../../../gs-api/src/model/fournisseurRequestDto';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-nouveau-clt-frs',
  imports: [
    FormsModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './nouveau-clt-frs.html',
  styleUrl: './nouveau-clt-frs.css'
})
export class NouveauCltFrs {
  origin = '';

 clientFournisseur: ClientRequestDto={
   nom: '',
   prenom: '',
   adresse: {
     adresse1: '',
     adresse2: '',
     ville: '',
     codePostal: '',
     pays: ''
   },
   photo: '',
   email: '',
   numTel: '',
   entrepriseId: 0
 }
  errorMsg: Array<string>=[];

  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    private cltFrsService: Cltfrs
  ) {}

  ngOnInit(): void{
    this.activateRoute.data.subscribe(data =>{
      this.origin = data['origin']
    })
  }

 enregistrer():void {
   if(this.origin === 'client'){
     this.cltFrsService.enregistrerClient(this.mapToClient())
       .subscribe({
         next: (client) =>{
           this.router.navigate(['clients'])
         }, error: (error)=>{
           this.errorMsg = error.error.errors
     }
       })
   }else if (this.origin === 'fournisseur'){
     this.cltFrsService.enregistrerFournisseur(this.mapToFournisseur())
     .subscribe({
       next: (fournisseur) =>{
         this.router.navigate(['fournisseurs'])
       }, error: (error)=>{
         this.errorMsg = error.error.errors
       }
     })
   }
  }

  cancelClick():void {
    if(this.origin === 'client'){
      this.router.navigate(['clients'])
    }else if (this.origin === 'fournisseur'){
      this.router.navigate(['fournisseurs'])
    }
  }

  mapToClient(): ClientRequestDto{
    const clientDto: ClientRequestDto = this.clientFournisseur
    return clientDto
  }

  mapToFournisseur(): FournisseurRequestDto{
    const fournisseurDto: FournisseurRequestDto = this.clientFournisseur
    return fournisseurDto
  }
}
