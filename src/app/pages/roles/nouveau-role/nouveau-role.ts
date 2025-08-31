import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RolesService } from '../../../services/roles/roles.service';
import { RolesRequestDto, RolesResponseDto } from '../../../../gs-api/src';

@Component({
  selector: 'app-nouveau-role',
  imports: [FormsModule, CommonModule],
  templateUrl: './nouveau-role.html',
  styleUrl: './nouveau-role.css'
})
export class NouveauRole {

  role: RolesRequestDto = {
    roleName: ''
  };

  errorMessage = '';
  successMessage = '';
  isLoading = false;

  constructor(
    private readonly router: Router,
    private readonly rolesService: RolesService
  ) {}

  save(): void {
    if (!this.validateForm()) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.rolesService.createRole(this.role).subscribe({
      next: (response: RolesResponseDto) => {
        this.successMessage = 'Rôle créé avec succès!';
        this.isLoading = false;
        setTimeout(() => {
          this.router.navigate(['roles']);
        }, 1500);
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors de la création du rôle: ' + (error.error?.message || error.message);
        this.isLoading = false;
      }
    });
  }

  private validateForm(): boolean {
    if (!this.role.roleName || this.role.roleName.trim().length === 0) {
      this.errorMessage = 'Le nom du rôle est obligatoire';
      return false;
    }

    if (this.role.roleName.trim().length < 2) {
      this.errorMessage = 'Le nom du rôle doit contenir au moins 2 caractères';
      return false;
    }

    return true;
  }

  cancel(): void {
    this.router.navigate(['roles']);
  }
}
