import { Component } from '@angular/core';
import {BouttonAction} from "../../composants/boutton-action/boutton-action";
import {DetailMvtStk} from "../../composants/detail-mvt-stk/detail-mvt-stk";
import {DetailMvtStkArticle} from "../../composants/detail-mvt-stk-article/detail-mvt-stk-article";
import {Pagination} from "../../composants/pagination/pagination";
import {DetailCltFrs} from '../../composants/detail-clt-frs/detail-clt-frs';
import {DetailCmd} from '../../composants/detail-cmd/detail-cmd';
import {DetailCmdCltFrs} from '../../composants/detail-cmd-clt-frs/detail-cmd-clt-frs';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-page-cmd-clt-frs',
  imports: [
    BouttonAction,
    Pagination,
    DetailCmd,
    DetailCmdCltFrs
  ],
  templateUrl: './page-cmd-clt-frs.html',
  styleUrl: './page-cmd-clt-frs.css'
})
export class PageCmdCltFrs {
  origin = '';
  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit(): void{
    this.activateRoute.data.subscribe(data =>{
      this.origin = data['origin']
    })
  }

  nouvelleCommande():void {
    if(this.origin === 'client'){
      this.router.navigate(['nouvellecommandeclt'])
    }else {
      this.router.navigate(['nouvellecommandefrs'])
    }

  }
}
