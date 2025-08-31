import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UtilisateurService } from '../../../services/utilisateur/utilisateur.service';
import { UtilisateurResponseDto } from '../../../../gs-api/src';

@Component({
  selector: 'app-nouvel-utilisateur',
  imports: [FormsModule, CommonModule],
  templateUrl: './nouvel-utilisateur.html',
  styleUrl: './nouvel-utilisateur.css'
})
export class NouvelUtilisateur {

  utilisateur = {
    nom: '',
    prenom: '',
    email: '',
    motDePasse: '',
    dateDeNaissance: '',
    adresse1: '',
    adresse2: '',
    ville: '',
    codePostal: '',
    pays: '',
    entrepriseId: 1 // Default enterprise ID
  };

  selectedImage: File | null = null;
  errorMessage = '';
  successMessage = '';
  isLoading = false;

  constructor(
    private readonly router: Router,
    private readonly utilisateurService: UtilisateurService
  ) {
  }

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
    }
  }

  save(): void {
    if (!this.validateForm()) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.utilisateurService.createUtilisateur(
      this.utilisateur.nom,
      this.utilisateur.prenom,
      this.utilisateur.email,
      this.utilisateur.motDePasse,
      this.utilisateur.dateDeNaissance,
      this.utilisateur.adresse1,
      this.utilisateur.ville,
      this.utilisateur.codePostal,
      this.utilisateur.pays,
      this.utilisateur.entrepriseId,
      this.utilisateur.adresse2,
      this.selectedImage || undefined
    ).subscribe({
      next: (response: UtilisateurResponseDto) => {
        this.successMessage = 'Utilisateur créé avec succès!';
        this.isLoading = false;
        setTimeout(() => {
          this.router.navigate(['utilisateurs']);
        }, 1500);
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors de la création de l\'utilisateur: ' + (error.error?.message || error.message);
        this.isLoading = false;
      }
    });
  }

  private validateForm(): boolean {
    if (!this.utilisateur.nom || !this.utilisateur.prenom || !this.utilisateur.email || 
        !this.utilisateur.motDePasse || !this.utilisateur.dateDeNaissance || 
        !this.utilisateur.adresse1 || !this.utilisateur.ville || 
        !this.utilisateur.codePostal || !this.utilisateur.pays) {
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires';
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.utilisateur.email)) {
      this.errorMessage = 'Veuillez entrer un email valide';
      return false;
    }

    return true;
  }

  cancel(): void {
    this.router.navigate(['utilisateurs']);
  }
}
