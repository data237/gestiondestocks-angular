import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BouttonAction} from "../../../composants/boutton-action/boutton-action";
import {Pagination} from "../../../composants/pagination/pagination";
import {Router} from '@angular/router';
import { UtilisateurService } from '../../../services/utilisateur/utilisateur.service';
import { UtilisateurResponseDto } from '../../../../gs-api/src';

@Component({
  selector: 'app-page-utilisateur',
  imports: [
    CommonModule,
    BouttonAction,
    Pagination
  ],
  templateUrl: './page-utilisateur.html',
  styleUrl: './page-utilisateur.css'
})
export class PageUtilisateur implements OnInit {
  
  utilisateurs: UtilisateurResponseDto[] = [];
  isLoading = false;
  errorMessage = '';

  constructor(
    private readonly router: Router,
    private readonly utilisateurService: UtilisateurService
  ) {
  }

  ngOnInit(): void {
    this.loadUtilisateurs();
  }

  loadUtilisateurs(): void {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.utilisateurService.getAllUtilisateurs().subscribe({
      next: (data: UtilisateurResponseDto[]) => {
        this.utilisateurs = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors du chargement des utilisateurs: ' + (error.error?.message || error.message);
        this.isLoading = false;
      }
    });
  }

  nouvelUtilisateur(): void {
    this.router.navigate(['nouvelutilisateur']);
  }

  onUtilisateurDeleted(): void {
    this.loadUtilisateurs(); // Reload the list after deletion
  }

  modifierUtilisateur(id?: number): void {
    this.router.navigate(['nouvelutilisateur', id]);
  }

  supprimerUtilisateur(id?: number): void {
    if (id && confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      this.utilisateurService.deleteUtilisateur(id).subscribe({
        next: () => {
          this.loadUtilisateurs();
        },
        error: (error) => {
          this.errorMessage = 'Erreur lors de la suppression: ' + (error.error?.message || error.message);
        }
      });
    }
  }

  voirDetails(utilisateur: UtilisateurResponseDto): void {
    console.log('Voir détails utilisateur:', utilisateur);
  }
}
