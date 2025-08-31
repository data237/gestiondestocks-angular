import { Component } from '@angular/core';
import {BouttonAction} from "../../../composants/boutton-action/boutton-action";
import {Pagination} from "../../../composants/pagination/pagination";
import {Router} from '@angular/router';
import {Cltfrs} from '../../../services/cltfrs/cltfrs';
import {FournisseurResponseDto} from '../../../../gs-api/src';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-page-fournisseur',
  imports: [
    BouttonAction,
    Pagination,
    NgForOf,
    NgIf
  ],
  templateUrl: './page-fournisseur.html',
  styleUrl: './page-fournisseur.css'
})
export class PageFournisseur {
  listFournisseur: Array<FournisseurResponseDto>=[];
  errorMsg='';
  constructor(
    private router: Router,
    private cltFrsService : Cltfrs
  ) {
  }

  ngOnInit(): void{
    this.findAllFournisseurs()
  }

  findAllFournisseurs(): void{
    this.cltFrsService.findAllFournisseurs()
      .subscribe({
        next: (fournisseurs)=>{
          this.listFournisseur = fournisseurs
        }
      })
  }
  nouveauFournisseur(): void{
    this.router.navigate(['nouveaufournisseur']);
  }

  handleSuppression($event: any) {
    if($event === 'success'){
      this.findAllFournisseurs()
    }else{
      this.errorMsg = $event
    }
  }

  modifierFournisseur(fournisseur: FournisseurResponseDto): void {
    this.router.navigate(['nouveaufournisseur', fournisseur.id]);
  }

  supprimerFournisseur(fournisseur: FournisseurResponseDto): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce fournisseur ?')) {
      this.cltFrsService.deleteFournisseur(fournisseur.id!)
        .subscribe({
          next: () => {
            this.findAllFournisseurs();
          },
          error: (error) => {
            this.errorMsg = 'Erreur lors de la suppression';
          }
        });
    }
  }

  voirDetails(fournisseur: FournisseurResponseDto): void {
    console.log('Voir détails fournisseur:', fournisseur);
  }
}
