import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BouttonAction} from "../../composants/boutton-action/boutton-action";
import {Pagination} from "../../composants/pagination/pagination";
import {ActivatedRoute, Router} from '@angular/router';
import { CommandeClientResponseDto, CommandeFournisseurResponseDto } from '../../../gs-api/src';
import { CommandeClientService } from '../../services/commande-client/commande-client';
import { ModalConfirmation } from '../../composants/modal-confirmation/modal-confirmation';

@Component({
  selector: 'app-page-cmd-clt-frs',
  imports: [
    CommonModule,
    BouttonAction,
    Pagination,
    ModalConfirmation
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
    private readonly router: Router,
    private readonly activateRoute: ActivatedRoute,
    private readonly commandeClientService: CommandeClientService
  ) {}

  ngOnInit(): void{
    this.activateRoute.data.subscribe(data =>{
      this.origin = data['origin']
    });
    this.loadCommandes();
  }

  loadCommandes(): void {
    if (this.origin === 'client') {
      this.commandeClientService.findAll()
        .subscribe({
          next: (commandes) => {
            this.commandes = commandes;
          },
          error: (error) => {
            this.errorMsg = 'Erreur lors du chargement des commandes';
            console.error('Erreur:', error);
          }
        });
    } else {
      // TODO: Implement fournisseur service when available
      this.commandes = [];
    }
  }

  nouvelleCommande():void {
    if(this.origin === 'client'){
      this.router.navigate(['nouvellecommandeclt'])
    }else {
      this.router.navigate(['nouvellecommandefrs'])
    }
  }

  modifierCommande(commande: any): void {
    if (commande.id) {
      if (this.origin === 'client') {
        this.router.navigate(['nouvellecommandeclt', commande.id]);
      } else {
        this.router.navigate(['nouvellecommandefrs', commande.id]);
      }
    }
  }

  supprimerCommande(commande: any): void {
    this.commandeToDelete = commande;
    this.showDeleteModal = true;
  }

  confirmerSuppression(): void {
    if (this.commandeToDelete?.id) {
      if (this.origin === 'client') {
        this.commandeClientService.delete(this.commandeToDelete.id)
          .subscribe({
            next: () => {
              this.loadCommandes();
              this.fermerModal();
            },
            error: (error) => {
              this.errorMsg = 'Erreur lors de la suppression';
              this.fermerModal();
              console.error('Erreur:', error);
            }
          });
      } else {
        // TODO: Implement fournisseur delete when service available
        this.fermerModal();
      }
    }
  }

  fermerModal(): void {
    this.showDeleteModal = false;
    this.commandeToDelete = null;
  }

  getDeleteMessage(): string {
    return `Êtes-vous sûr de vouloir supprimer la commande "${this.commandeToDelete?.code || ''}" ?`;
  }

  voirDetails(commande: CommandeClientResponseDto | CommandeFournisseurResponseDto): void {
    if (commande.id) {
      if (this.origin === 'client') {
        this.router.navigate(['/detailcommandeclient', commande.id]);
      } else {
        this.router.navigate(['/detailcommandefournisseur', commande.id]);
      }
    }
  }

  getTotalCommande(commande: CommandeClientResponseDto | CommandeFournisseurResponseDto): number {
    // Calculate total from ligne commandes if available
    if ('ligneCommandeClients' in commande && commande.ligneCommandeClients) {
      return commande.ligneCommandeClients.reduce((total, ligne) => {
        return total + ((ligne.quantite || 0) * (ligne.prixUnitaire || 0));
      }, 0);
    }
    return 0;
  }

  getTotalGeneral(): number {
    return this.commandes.reduce((total, cmd) => total + this.getTotalCommande(cmd), 0);
  }

  getClientFournisseurName(commande: any): string {
    if (this.origin === 'client') {
      return commande.client ? `${commande.client.nom} ${commande.client.prenom}` : 'Client inconnu';
    } else {
      return commande.fournisseur ? `${commande.fournisseur.nom} ${commande.fournisseur.prenom}` : 'Fournisseur inconnu';
    }
  }

  getNbArticles(commande: any): number {
    if ('ligneCommandeClients' in commande && commande.ligneCommandeClients) {
      return commande.ligneCommandeClients.length;
    }
    return 0;
  }
}
