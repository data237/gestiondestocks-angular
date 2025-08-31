import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BouttonAction} from "../../composants/boutton-action/boutton-action";
import {Pagination} from "../../composants/pagination/pagination";
import {ActivatedRoute, Router} from '@angular/router';
import { CommandeClientResponseDto, CommandeFournisseurResponseDto } from '../../../gs-api/src';

@Component({
  selector: 'app-page-cmd-clt-frs',
  imports: [
    CommonModule,
    BouttonAction,
    Pagination
  ],
  templateUrl: './page-cmd-clt-frs.html',
  styleUrl: './page-cmd-clt-frs.css'
})
export class PageCmdCltFrs implements OnInit {
  origin = '';
  commandes: (CommandeClientResponseDto | CommandeFournisseurResponseDto)[] = [];
  errorMsg = '';
  showDeleteModal = false;
  commandeToDelete: any = null;
  
  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit(): void{
    this.activateRoute.data.subscribe(data =>{
      this.origin = data['origin']
    });
    this.loadCommandes();
  }

  loadCommandes(): void {
    // TODO: Implement real data loading from service
    this.commandes = [
      {
        id: 1,
        code: 'CMD001',
        dateCommande: '2024-01-15'
      } as any,
      {
        id: 2,
        code: 'CMD002', 
        dateCommande: '2024-01-16'
      } as any
    ];
  }

  nouvelleCommande():void {
    if(this.origin === 'client'){
      this.router.navigate(['nouvellecommandeclt'])
    }else {
      this.router.navigate(['nouvellecommandefrs'])
    }
  }

  modifierCommande(commande: any): void {
    // Navigate to edit command page with command ID
    if (commande.id) {
      this.router.navigate(['nouvellecommande', commande.id]);
    }
  }

  supprimerCommande(commande: any): void {
    this.commandeToDelete = commande;
    this.showDeleteModal = true;
  }

  confirmerSuppression(): void {
    if (this.commandeToDelete) {
      // TODO: Implement delete command logic with proper service call
      console.log('Supprimer commande:', this.commandeToDelete);
      // Example: this.commandeService.delete(this.commandeToDelete.id).subscribe(...)
      this.showDeleteModal = false;
      this.commandeToDelete = null;
    }
  }

  annulerSuppression(): void {
    this.showDeleteModal = false;
    this.commandeToDelete = null;
  }

  voirDetails(commande: CommandeClientResponseDto | CommandeFournisseurResponseDto): void {
    console.log('Voir détails commande:', commande);
  }

  getTotalCommande(commande: CommandeClientResponseDto | CommandeFournisseurResponseDto): number {
    // TODO: Calculate real total from ligne commandes
    return Math.random() * 1000;
  }

  getTotalGeneral(): number {
    return this.commandes.reduce((total, cmd) => total + this.getTotalCommande(cmd), 0);
  }

  getClientFournisseurName(commande: any): string {
    if (this.origin === 'client') {
      return 'Client Demo';
    } else {
      return 'Fournisseur Demo';
    }
  }

  getNbArticles(commande: any): number {
    return Math.floor(Math.random() * 5) + 1;
  }
}
