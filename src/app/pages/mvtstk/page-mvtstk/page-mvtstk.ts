import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ModalConfirmation } from '../../../composants/modal-confirmation/modal-confirmation';
import { BouttonAction } from '../../../composants/boutton-action/boutton-action';
import { MvtStkService } from '../../../services/mvtstk.service';
import { MvtStkResponseDto } from '../../../../gs-api/src/model/models';

@Component({
  selector: 'app-page-mvtstk',
  imports: [
    CommonModule,
    ModalConfirmation,
    BouttonAction
  ],
  templateUrl: './page-mvtstk.html',
  styleUrl: './page-mvtstk.css'
})
export class PageMvtstk implements OnInit {
  listMouvements: MvtStkResponseDto[] = [];
  showDeleteModal = false;
  mouvementToDelete: MvtStkResponseDto | null = null;
  errorMsg = '';

  constructor(
    private readonly router: Router,
    private readonly mvtStkService: MvtStkService
  ) {}

  ngOnInit(): void {
    // Initialize movements data
    this.loadMouvements();
  }

  loadMouvements(): void {
    this.mvtStkService.findAll().subscribe({
      next: (mouvements) => {
        this.listMouvements = mouvements;
        this.errorMsg = '';
      },
      error: (error) => {
        console.error('Erreur lors du chargement des mouvements:', error);
        this.errorMsg = 'Erreur lors du chargement des mouvements de stock';
        this.listMouvements = [];
      }
    });
  }

  modifierMouvement(mvt: any): void {
    console.log('Modifier mouvement:', mvt);
    // Navigate to movement edit page
    this.router.navigate(['nouveaumouvement', mvt.id]);
  }

  supprimerMouvement(mvt: any): void {
    this.mouvementToDelete = mvt;
    this.showDeleteModal = true;
  }

  confirmerSuppression(): void {
    if (this.mouvementToDelete?.id) {
      this.mvtStkService.delete(this.mouvementToDelete.id).subscribe({
        next: () => {
          console.log('Mouvement supprimé avec succès');
          // Remove from local list
          const index = this.listMouvements.findIndex(m => m.id === this.mouvementToDelete?.id);
          if (index > -1) {
            this.listMouvements.splice(index, 1);
          }
          this.fermerModal();
          this.errorMsg = '';
        },
        error: (error) => {
          console.error('Erreur lors de la suppression:', error);
          this.errorMsg = 'Erreur lors de la suppression du mouvement';
          this.fermerModal();
        }
      });
    }
  }

  fermerModal(): void {
    this.showDeleteModal = false;
    this.mouvementToDelete = null;
  }

  getDeleteMessage(): string {
    if (this.mouvementToDelete?.dateMvt) {
      const dateStr = new Date(this.mouvementToDelete.dateMvt).toLocaleDateString('fr-FR');
      return `Êtes-vous sûr de vouloir supprimer le mouvement du ${dateStr} pour "${this.mouvementToDelete.article?.designation}" ?`;
    }
    return 'Êtes-vous sûr de vouloir supprimer ce mouvement ?';
  }

  voirDetails(mvt: any): void {
    console.log('Voir détails mouvement:', mvt);
    // Navigate to movement details page
    this.router.navigate(['detailmouvement', mvt.id]);
  }
}
