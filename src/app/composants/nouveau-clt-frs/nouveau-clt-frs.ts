import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ClientRequestDto} from '../../../gs-api/src/model/clientRequestDto';
import {FormsModule} from '@angular/forms';
import {Cltfrs} from '../../services/cltfrs/cltfrs';
import {EntrepriseResponseDto} from '../../../gs-api/src';
import {FournisseurRequestDto} from '../../../gs-api/src/model/fournisseurRequestDto';
import {CommonModule} from '@angular/common';
import {EntrepriseService} from '../../services/entreprise/entreprise';

@Component({
  selector: 'app-nouveau-clt-frs',
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './nouveau-clt-frs.html',
  styleUrl: './nouveau-clt-frs.css'
})
export class NouveauCltFrs implements OnInit {
  origin = '';
  imagePreview: string | null = null;
  selectedImage: File | null = null;
  selectedEntreprise: EntrepriseResponseDto | null = null;
  listeEntreprises: EntrepriseResponseDto[] = [];

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
    private readonly router: Router,
    private readonly activateRoute: ActivatedRoute,
    private readonly cltFrsService: Cltfrs,
    private readonly entrepriseService: EntrepriseService
  ) {}

  ngOnInit(): void{
    this.activateRoute.data.subscribe(data =>{
      this.origin = data['origin']
    });
    this.loadEntreprises();
  }

  loadEntreprises(): void {
    this.entrepriseService.findAll().subscribe({
      next: (entreprises) => {
        this.listeEntreprises = entreprises;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des entreprises:', error);
      }
    });
  }

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onEntrepriseChange(): void {
    this.clientFournisseur.entrepriseId = this.selectedEntreprise?.id || 0;
  }

 enregistrer():void {
   // Validation: s'assurer qu'une entreprise est sélectionnée
   if (!this.clientFournisseur.entrepriseId || this.clientFournisseur.entrepriseId === 0) {
     this.errorMsg = ['Veuillez sélectionner une entreprise'];
     return;
   }

   if(this.origin === 'client'){
     this.cltFrsService.enregistrerClient(this.mapToClient(), this.selectedImage || undefined)
       .subscribe({
         next: (client) =>{
           this.router.navigate(['clients'])
         }, error: (error)=>{
           this.errorMsg = error.error.errors
     }
       })
   }else if (this.origin === 'fournisseur'){
     this.cltFrsService.enregistrerFournisseur(this.mapToFournisseur(), this.selectedImage || undefined)
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
