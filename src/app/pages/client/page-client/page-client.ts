import { Component } from '@angular/core';
import {BouttonAction} from "../../../composants/boutton-action/boutton-action";
import {Pagination} from "../../../composants/pagination/pagination";
import {Router} from '@angular/router';
import {Cltfrs} from '../../../services/cltfrs/cltfrs';
import {ClientResponseDto} from '../../../../gs-api/src';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-page-client',
  imports: [
    BouttonAction,
    Pagination,
    NgForOf,
    NgIf
  ],
  templateUrl: './page-client.html',
  styleUrl: './page-client.css'
})
export class PageClient {
  listclient: Array<ClientResponseDto>=[];
 errorMsg= '';
  constructor(
    private router: Router,
    private cltFrsService : Cltfrs
  ) {
  }

  ngOnInit(): void{
    this.findAllClient()
  }

  findAllClient(): void{
    this.cltFrsService.findAllClients()
      .subscribe({
        next: (clients)=>{
          this.listclient = clients
        }
      })
  }
  nouveauClient(): void{
    this.router.navigate(['nouveauclient']);
  }

  handleSuppression($event: any) {
    if($event === 'success'){
      this.findAllClient()
    }else{
      this.errorMsg = $event
    }
  }

  modifierClient(client: ClientResponseDto): void {
    this.router.navigate(['nouveauclient', client.id]);
  }

  supprimerClient(client: ClientResponseDto): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce client ?')) {
      this.cltFrsService.deleteClient(client.id!)
        .subscribe({
          next: () => {
            this.findAllClient();
          },
          error: (error) => {
            this.errorMsg = 'Erreur lors de la suppression';
          }
        });
    }
  }

  voirDetails(client: ClientResponseDto): void {
    console.log('Voir détails client:', client);
  }
}
