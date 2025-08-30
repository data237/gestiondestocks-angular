import { Component } from '@angular/core';
import {BouttonAction} from "../../../composants/boutton-action/boutton-action";
import {DetailArticle} from "../../../composants/detail-article/detail-article";
import {Pagination} from "../../../composants/pagination/pagination";
import {DetailCltFrs} from '../../../composants/detail-clt-frs/detail-clt-frs';
import {Router} from '@angular/router';
import {Cltfrs} from '../../../services/cltfrs/cltfrs';
import {ClientResponseDto} from '../../../../gs-api/src';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-page-client',
  imports: [
    BouttonAction,
    Pagination,
    DetailCltFrs,
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
}
