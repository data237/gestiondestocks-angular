import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nouvel-utilisateur',
  imports: [],
  templateUrl: './nouvel-utilisateur.html',
  styleUrl: './nouvel-utilisateur.css'
})
export class NouvelUtilisateur {


  constructor(
    private router: Router
  ) {
  }
  cancel(): void {
    this.router.navigate(['utilisateurs'])
  }
}
