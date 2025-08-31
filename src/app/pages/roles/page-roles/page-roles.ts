import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RolesService } from '../../../services/roles/roles.service';
import { RolesResponseDto } from '../../../../gs-api/src';
import { BouttonAction } from '../../../composants/boutton-action/boutton-action';
import { Pagination } from '../../../composants/pagination/pagination';

@Component({
  selector: 'app-page-roles',
  imports: [CommonModule, BouttonAction, Pagination],
  templateUrl: './page-roles.html',
  styleUrl: './page-roles.css'
})
export class PageRoles implements OnInit {
  
  roles: RolesResponseDto[] = [];
  isLoading = false;
  errorMessage = '';

  constructor(
    private readonly router: Router,
    private readonly rolesService: RolesService
  ) {}

  ngOnInit(): void {
    this.loadRoles();
  }

  loadRoles(): void {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.rolesService.getAllRoles().subscribe({
      next: (data: RolesResponseDto[]) => {
        this.roles = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors du chargement des rôles: ' + (error.error?.message || error.message);
        this.isLoading = false;
      }
    });
  }

  nouveauRole(): void {
    this.router.navigate(['nouveaurole']);
  }

  onRoleDeleted(): void {
    this.loadRoles();
  }

  deleteRole(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce rôle ?')) {
      this.rolesService.deleteRole(id).subscribe({
        next: () => {
          this.loadRoles();
        },
        error: (error) => {
          console.error('Erreur lors de la suppression:', error);
          alert('Erreur lors de la suppression du rôle');
        }
      });
    }
  }

  modifierRole(id?: number): void {
    this.router.navigate(['nouveaurole', id]);
  }

  supprimerRole(id?: number): void {
    if (id) {
      this.deleteRole(id);
    }
  }

  voirDetails(role: RolesResponseDto): void {
    console.log('Voir détails rôle:', role);
  }
}
