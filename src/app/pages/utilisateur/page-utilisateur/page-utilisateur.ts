import { Component } from '@angular/core';
import {BouttonAction} from "../../../composants/boutton-action/boutton-action";
import {DetailCltFrs} from "../../../composants/detail-clt-frs/detail-clt-frs";
import {Pagination} from "../../../composants/pagination/pagination";
import {Router} from '@angular/router';
import {DetailUtilisateur} from '../../../composants/detail-utilisateur/detail-utilisateur';

@Component({
  selector: 'app-page-utilisateur',
  imports: [
    BouttonAction,
    Pagination,
    DetailUtilisateur
  ],
  templateUrl: './page-utilisateur.html',
  styleUrl: './page-utilisateur.css'
})
export class PageUtilisateur {
  constructor(
    private router: Router
  ) {
  }
  nouvelUtilisateur(): void {
    this.router.navigate(['nouvelutilisateur'])
  }
}
