import { Component } from '@angular/core';
import {BouttonAction} from "../../../composants/boutton-action/boutton-action";
import {DetailCltFrs} from "../../../composants/detail-clt-frs/detail-clt-frs";
import {Pagination} from "../../../composants/pagination/pagination";
import {Router} from '@angular/router';
import {Cltfrs} from '../../../services/cltfrs/cltfrs';
import {FournisseurResponseDto} from '../../../../gs-api/src';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-page-fournisseur',
  imports: [
    BouttonAction,
    DetailCltFrs,
    Pagination,
    NgForOf
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
}
