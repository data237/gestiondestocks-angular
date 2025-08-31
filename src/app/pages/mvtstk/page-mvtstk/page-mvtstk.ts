import { Component } from '@angular/core';
import {BouttonAction} from "../../../composants/boutton-action/boutton-action";
import {Pagination} from "../../../composants/pagination/pagination";
import {NgForOf, NgClass, DatePipe} from '@angular/common';

@Component({
  selector: 'app-page-mvtstk',
  imports: [
    BouttonAction,
    Pagination,
    NgForOf,
    NgClass,
    DatePipe
  ],
  templateUrl: './page-mvtstk.html',
  styleUrl: './page-mvtstk.css'
})
export class PageMvtstk {
  listMouvements: any[] = [];

  ngOnInit(): void {
    // Initialize movements data
    this.loadMouvements();
  }

  loadMouvements(): void {
    // TODO: Load movements from service
    this.listMouvements = [
      {
        id: 1,
        dateMvt: new Date(),
        article: { designation: 'Article 1' },
        typeMvt: 'ENTREE',
        quantite: 10,
        sourceMvt: 'Fournisseur A'
      },
      {
        id: 2,
        dateMvt: new Date(),
        article: { designation: 'Article 2' },
        typeMvt: 'SORTIE',
        quantite: 5,
        sourceMvt: 'Client B'
      }
    ];
  }

  voirDetails(mvt: any): void {
    console.log('Voir détails mouvement:', mvt);
  }
}
