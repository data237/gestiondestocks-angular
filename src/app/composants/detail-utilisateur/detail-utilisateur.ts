import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilisateurResponseDto } from '../../../gs-api/src';
import { UtilisateurService } from '../../services/utilisateur/utilisateur.service';

@Component({
  selector: 'app-detail-utilisateur',
  imports: [CommonModule],
  templateUrl: './detail-utilisateur.html',
  styleUrl: './detail-utilisateur.css'
})
export class DetailUtilisateur {
  @Input() utilisateur!: UtilisateurResponseDto;
  @Output() deleteEvent = new EventEmitter<void>();

  constructor(private readonly utilisateurService: UtilisateurService) {}

  deleteUtilisateur(): void {
    if (this.utilisateur.id && confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      this.utilisateurService.deleteUtilisateur(this.utilisateur.id).subscribe({
        next: () => {
          this.deleteEvent.emit();
        },
        error: (error) => {
          console.error('Erreur lors de la suppression:', error);
          alert('Erreur lors de la suppression de l\'utilisateur');
        }
      });
    }
  }
}
